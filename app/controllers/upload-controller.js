
/*
	Here comes the thumbnail  uploader tan tan tan tanan!!!
*/




/*photoUpload*/



function UploadController($scope,$state,$http,UploaderService) {
 	

 	/*
		Important variables
 	*/

 	$scope.overlay					 = [];
	$scope.skip_or_continue          = "Skip";
	$scope.filenames_uploaded        = UploaderService.filenames_uploaded;
	$scope.uploader_id               = UploaderService.uploader_id;
	$scope.upload_forms              = UploaderService.upload_forms;
	$scope.comment_model             = UploaderService.comment_model;
	$scope.regroupingStatus          = false;
	$scope.groupTarget               = UploaderService.groupTarget;
	$scope.showProgress              = UploaderService.showProgress;
	$scope.fineUploaderDragInstances = UploaderService.fineUploaderDragInstances;
	$scope.fineUploaderInstances     = UploaderService.fineUploaderInstances;
	$scope.groupSettings             = UploaderService.groupSettings;
	$scope.photoGrouping             = UploaderService.photoGrouping;
	$scope.perGroupBlending          = UploaderService.perGroupBlending;
	$scope.blending                  = UploaderService.blending;
	$scope.group_id                  = UploaderService.group_id;


	/*
		This will be the model for uploaded images. Photos will be object not array
	*/

 	$scope.uploadedFiles = UploaderService.uploadedFiles;


 	/*
		The model for Groupings select options
 	*/			
 	$scope.groupings = [
		{group_value : "2", group_label : "Auto Groups every 2 photos"},
		{group_value : "3", group_label : "Auto Groups every 3 photos"},
		{group_value : "4", group_label : "Auto Groups every 4 photos"},
		{group_value : "5", group_label : "Auto Groups every 5 photos"},
		{group_value : "6", group_label : "Auto Groups every 6 photos"},
		{group_value : "7", group_label : "Auto Groups every 7 photos"},
		{group_value : "8", group_label : "Auto Groups every 8 photos"},
		{group_value : "9", group_label : "Auto Groups every 9 photos"}
	];

	/*
		the model for masking select option
	*/
	$scope.blendingGroups = [
		{blending_value : "masking" , blending_label: "Masking Groups"},
		{blending_value : "hdr" , blending_label: "HDR Groups"},
		{blending_value : "blending" , blending_label: "Blending Groups"},
		{blending_value : "panoramic" , blending_label: "Panoramic Groups"}
	]



	$scope.$watch(function(newValues, oldValues, scope) {
	  	
		UploaderService.uploadedFiles             = $scope.uploadedFiles;
		UploaderService.uploader_id               = $scope.uploader_id;
		UploaderService.upload_forms              = $scope.upload_forms;
		UploaderService.comment_model             = $scope.comment_model;
		UploaderService.regroupingStatus          = $scope.regroupingStatus;
		UploaderService.groupTarget               = $scope.groupTarget;
		UploaderService.showProgress              = $scope.showProgress;
		UploaderService.fineUploaderDragInstances = $scope.fineUploaderDragInstances;
		UploaderService.fineUploaderInstances     = $scope.fineUploaderInstances;
		UploaderService.groupSettings             = $scope.groupSettings;
		UploaderService.photoGrouping             = $scope.photoGrouping;
		UploaderService.perGroupBlending          = $scope.perGroupBlending;
		UploaderService.blending                  = $scope.blending;
		UploaderService.group_id                  = $scope.group_id;


	});

	$scope.bytesToMb = function(bytes) {
		if(bytes != undefined) {
			return $scope.byteConverter(bytes);
		}
	}

	$scope.byteConverter = function(bytes) {

	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}

	$scope.updatePropByUploader = function (target_id,id) {

		if(target_id == "thumbnail") {
			
			var end_point = BASE_URL+"/ClientIntakeUpload/photoUpload";
			$scope.fineUploaderInstances[target_id].setEndpoint(end_point,id)
		}
		else if(target_id == "presets") {
			
			var end_point = BASE_URL+"/ClientIntakeUpload/presetsUpload";
			$scope.fineUploaderInstances[target_id].setEndpoint(end_point,id)

		}
		else if(target_id == "screencast") {
			
			var end_point = BASE_URL+"/ClientIntakeUpload/screenCastUpload";
			$scope.fineUploaderInstances[target_id].setEndpoint(end_point,id)
		}
		else if(target_id == "style-guide-interior") {
			
			var end_point = BASE_URL+"/ClientIntakeUpload/styleGuideInteriorUpload";
			$scope.fineUploaderInstances[target_id].setEndpoint(end_point,id)
		}

		else if(target_id == "style-guide-exterior") {
			
			var end_point = BASE_URL+"/ClientIntakeUpload/styleGuideExteriorUpload";
			$scope.fineUploaderInstances[target_id].setEndpoint(end_point,id)
		}

	}

	$scope.addFilesFromButton = function(files,target_id) {

		$scope.$apply(function(){
			$scope.fineUploaderInstances[target_id].addFiles(files);
		});
		
	}

	$scope.createNewInstanceFine = function(target_id) {

		$scope.fineUploaderInstances[target_id] = CreateFineUploaderInstance($scope,target_id);
      	$scope.fineUploaderInstances[target_id]._options.autoUpload = true;
      	$scope.filenames_uploaded[target_id] = [];

      	if($scope.fineUploaderInstances[target_id].token == undefined) {
         	var token = Math.random().toString(36).slice(2);
          	$scope.fineUploaderInstances[target_id].token = token;
          	$scope.fineUploaderInstances[target_id].uploader_type = target_id;
      	}

      	$scope.fineUploaderInstances[target_id]._options.request.params.token = $scope.fineUploaderInstances[target_id].token;
      	$scope.fineUploaderInstances[target_id]._options.request.params.uploader_type = $scope.fineUploaderInstances[target_id].uploader_type;


	}

	$scope.validateDuplicates = function(file){

		return "";
	}

	$scope.initializedNewUploads = function(target_id) {

		if($scope.uploadedFiles[target_id] != undefined) {

	        var files = $scope.uploadedFiles[target_id].photos;
	        $scope.fineUploaderInstances[target_id].addFiles(files);

	    }else{
	          
          	$scope.createNewInstanceFine(target_id);
	    }
	}

	$scope.allowedExtensions = function(target_id) {

		var allowed_extensions = [];

		if(target_id == "thumbnail" || target_id == "style-guide-interior" || target_id == "style-guide-exterior") {
			allowed_extensions = ['jpg','png','jpeg'];
		}
		else if(target_id == "presets") {
			allowed_extensions = ['lrtemplate','xmp','zip'];
		}
		else if(target_id == "screencast") {
			
			allowed_extensions = ['avi','mpeg','mp4','webm'];
		}

		return allowed_extensions;
		
	}

	$scope.hoverIn = function(uuid){

		$scope.overlay[uuid] = true;
	}

	$scope.hoverOut = function(uuid){

		$scope.overlay[uuid] = false;
	}

	$scope.checkInArray = function(file,target_id) {

		var file_ext = file.type.split("/");
		var file_name = file.name.split(".");

		if(file_ext == "" || file_ext == undefined){
			file_ext = file_name[1];
		}else{
			file_ext = file_ext[1];
		}

		var allowed_ext = $scope.allowedExtensions(target_id);
		return allowed_ext.indexOf(file_ext) > -1;
	}

	$scope.customValidation = function(target_id,raw_files) {

		var file_length = raw_files.length;

		for(var i = raw_files.length - 1; i >= 0; i--) {
			if($scope.checkInArray(raw_files[i],target_id) == false) {
				raw_files.splice(i,1);
			}
		}

		return raw_files;
	}

	
	/*
		$scope.getSubmittedFiles
		
		This function will process passed files from droppable function of
		fine uploader.

	*/
 	$scope.getSubmittedFiles = function(target_id,new_files,id) {

		/*Now we have to group this files in accordance if it is group or not*/

	
		if($scope.groupSettings[target_id] == true) {// auto group photos

			var submitted_files = new_files;
			var group_name      = "";
			var photos          = "";
			var group_by        = $scope.photoGrouping[target_id].group_value;

			$scope.groupElements(submitted_files,group_by,target_id);

		}else{// do not autogroup photos

			var submitted_files = new_files;
		
			if ($scope.uploadedFiles[target_id] == undefined) {
			  	
			  	$scope.uploadedFiles[target_id] = [];
			  	$scope.uploadedFiles[target_id].photos = {};

			  	
			}

			
			/*
				We need to iterate through the files so we can put it in the angular models 
				which are designated in each $scope.uploadedFiles. 
			*/
			for(var i = 0; i < submitted_files.length; i++) {

				/*
					Making sure no undefined values
					otherwise make it 0;
					This will sync the id of fineuploader and angular js
				*/
				if($scope.uploader_id[target_id] == undefined) {
					$scope.uploader_id[target_id] = 0;
				}

				/*
					Assigning new values to the submitted files
					id for the unique identifier
					uuid also unique identifier of fineuploader
					url for the default thumbnail generation
				*/

				submitted_files[i].id = id;
				submitted_files[i].uuid = $scope.fineUploaderInstances[target_id].getUuid(id);

				/*
					Now passing everything to angular model in order for the view to be updated yeahh!
				*/
				$scope.uploadedFiles[target_id].photos[submitted_files[i].id] = submitted_files[i];
				$scope.uploader_id[target_id] = $scope.uploader_id[target_id] + 1;

				//lastly we will add the newly added filename for validation to avoid duplicaets
				$scope.filenames_uploaded[target_id].push(submitted_files[i]['name']);

			}

			
		}


		$scope.skip_or_continue = "Continue";

		
		
	}	



	/*
		This will group the new elements. Note. New Elements 
	*/

	$scope.groupElements = function(elements,group_by,index) {

		$scope.uploadedFiles[index].photos = [];//resets the photos section

		var group_counter = 1;
		var photo_id      = 0;
		var per_group     = Math.round(elements.length / group_by);
		var photos        = [];
		
		var photos        = [];
		var i             = 0;

		while(i < elements.length) {

			var format = {
				
				"photos":[{}]
			}

			for(var s = 0; s < group_by; s++) {
				
				if(elements[i] != undefined) {
					format.photos[s] = elements[i];
					i++;
				}
				
			}

			$scope.uploadedFiles[index].groups[$scope.group_id[index]] = format;
			photos = [];
			$scope.group_id[index]++;

		}		
	}


	/*
		Adding new custom batch meaning making new group
	*/
	$scope.addCustomBatch = function(index) {

		var new_custom_batch = {};

		$scope.uploadedFiles[index].groups.push(new_custom_batch);

	}

	/*
		Regrouping of all photos uploaded
		Note that i have not yet put a filter in getUploads function. 
	*/
	$scope.regroupingPhotos = function(index) {

		var elements                       = $scope.fineUploaderInstances[index].getUploads();
		var group_by                       = $scope.photoGrouping[index].group_value;
		
		$scope.uploadedFiles[index].groups = [];//empty batches 
		$scope.group_id[index]             = 0 ; //reseeting group id
		$scope.groupElements(elements,group_by,index);//calling groupElements to regroup elements
	}
	
	/*
		Remove group, by using parent index and what specific group
	*/
	$scope.removeGroup = function (parent_index,group_index) {

		var temp_photos = $scope.uploadedFiles[parent_index].groups[group_index].photos;
		
		$scope.uploadedFiles[parent_index].groups.splice(group_index, 1);

		var test = $('#group-'+parent_index+"-"+group_index);		
		for (i = 0; i < temp_photos.length; i++) { 
		    $scope.uploadedFiles[parent_index].photos.push(temp_photos[i]);
		}
	}

	/*
		Updating target values on drop 
		Note this is for drag and drop 
	*/
	$scope.updateTargetValues = function(target) {

		$scope.groupTarget = target;
		$scope.regroupingStatus = true;
	}

	/*
		This is for updating the elements after drag and drop
	*/
	$scope.updateGrouping = function(ui) {

		var target_batch_index = $($scope.groupTarget).attr('data-batchIndex');
	  	var target_group_index = $($scope.groupTarget).attr('data-groupIndex');

	  	for(var i = 0; i < ui.length; i++) {

	  		var batch_index = $(ui[i]).attr('data-batchIndex');
		  	var group_index = $(ui[i]).attr('data-groupIndex');
		  	var photo_index = $(ui[i]).attr('data-photoIndex');		
			

		  	var photo = $scope.uploadedFiles[batch_index].groups[group_index].photos[photo_index];

		  	if(target_group_index != group_index) {
		  		$scope.uploadedFiles[target_batch_index].groups[target_group_index].photos.push(photo);
		  	}else{
		  		
		  	}
		
		}
	}

	/*
		DEPRECATED
	*/
	$scope.removePhotosFromArrayTransfered = function(ui) {

		for(var i = 0; i < ui.length; i++) {

			var batch_index = $(ui[i]).attr('data-batchIndex');
			var group_index = $(ui[i]).attr('data-groupIndex');
			var photo_index = $(ui[i]).attr('data-photoIndex');	

			$scope.uploadedFiles[batch_index].groups[group_index].photos.splice(photo_index,1);

		}

		$scope.regroupingStatus = false;
		
	}

	/*
		DEPRECATED
	*/
	$scope.regrouping = function (source,target) {
		
		var source_group_index = $(source.sender[0]).attr('data-groupindex');

		var target_group_index = $(target).attr('data-groupindex');

		if(target_group_index == source_group_index) {
			return false; //same group means donot regroup
		}else{
			return true;
		}
	}


	/*
		This will cancel images wheither it is uploaded or not 
	*/	
	$scope.cancelImage = function(uploader_index,photo) {


		var parameters = {"uploader_type": uploader_index,"filename": photo.name , "uuid" : photo.uuid , "token": $scope.fineUploaderInstances[uploader_index].token};

		//checking if it is uploaded or not by checking the url in the object
		if($scope.uploadedFiles[uploader_index].photos[photo.id].status == "upload successful") { // deleting before uploading
			
			$scope.fineUploaderInstances[uploader_index].cancel(photo.id); //cancel method will make the photo removed from the fineuploaders instance
			delete $scope.uploadedFiles[uploader_index].photos[photo.id]; //delete the specific photo object
			return; // stop the execution
		}

		/*
			Deleting from server
		*/
		$scope.fineUploaderInstances[uploader_index].setDeleteFileParams(parameters,photo.id);
		$scope.fineUploaderInstances[uploader_index].deleteFile(photo.id);
		delete $scope.uploadedFiles[uploader_index].photos[photo.id];

	}	

	/*
		Request the new image uploaded from server
	*/
	$scope.requestUploadedImage = function(id,responseJSON,target_id) {

		console.log("requestUploadedImage")
		console.log($scope.uploadedFiles[target_id].photos[id])
		$scope.uploadedFiles[target_id].photos[id].url = responseJSON.url;
		$scope.$apply();

	}

	/*
		Validate the uploads, specifically the comments
	*/
	$scope.validateAndZip = function(uploader_index) {

		var error_count = 0;

		var photo_length = Object.keys($scope.uploadedFiles[uploader_index].photos).length;

		if($scope.upload_forms[uploader_index].$invalid) {
			alert("There seems an error in your fields")
			return;
		}

		$scope.zipIMages(uploader_index);

	}

	$scope.zipIMages = function() {

		alert("zipping images");
		/*YOUR CODE HERE*/
	}

	$scope.validateFiles = function(files,target_id) {

		
        
	}

	$scope.removeAllPhotos = function(uploader_index) {

		var length = Object.keys($scope.uploadedFiles[uploader_index].photos).length;

		for (var key in $scope.uploadedFiles[uploader_index].photos) {


			if($scope.uploadedFiles[uploader_index].photos[key].url == "" || $scope.uploadedFiles[uploader_index].photos[key].status == "upload successful") {
			 	var photo_obj = $scope.uploadedFiles[uploader_index].photos[key];
			 	$scope.fineUploaderInstances[uploader_index].cancel(photo_obj.id); 
				delete $scope.uploadedFiles[uploader_index].photos[photo_obj.id];
			}

			else{

			 	var photo_obj = $scope.uploadedFiles[uploader_index].photos[key];
			 	var parameters = {"uploader_type":uploader_index ,"filename": photo_obj.name , "uuid" : photo_obj.uuid , "token": $scope.fineUploaderInstances[uploader_index].token};
			 	$scope.fineUploaderInstances[uploader_index].setDeleteFileParams(parameters,photo_obj.id);
				$scope.fineUploaderInstances[uploader_index].deleteFile(photo_obj.id);
				delete $scope.uploadedFiles[uploader_index].photos[photo_obj.id];

			}
			

		}



		$scope.filenames_uploaded[uploader_index] = [];


	}
}



function callDrawThumbnail(id,uuid,$scope) {

	var image_container = $('#'+uuid);

	$scope.fineUploaderInstances[0].drawThumbnail(id,image_container, 870, false);
}

