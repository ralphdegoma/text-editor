var BASE_URL = 'http://localhost/V2.9.0/';//wired connection IP
var FRONT_END_DEVELOPMENT = false;


var app = angular.module('app.uploader', [])

app.directive('thumbnaildirective', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            
            if(attrs.src != undefined) {
                $(element).show();
                $(element).css('opacity',1);
                
                var progressBar = $(element).parent().next();

                $(progressBar).attr('max',100);
                $(progressBar).attr('value',100);
            }
        }
    }
});



app.directive('filereader', function() {
     
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {

            $(element).change(function(){
                 var files = $(this).prop("files");
                 console.log(files);
                 $scope.addFilesFromButton(files,attrs.target);
            });
             
        }
    }


});


app.directive('fineuploader', function() {
	   
	  return {
		    restrict: 'A',
        link: function($scope, element, attrs) {

            	element.ready(function() {

                  console.log("%cFineUploader Instance has been initialized", "color: blue; font-size:15px;"); 

      	        	var target_obj = element[0];
      	        	var target_id = target_obj.dataset.target;
                  
                  $scope.$apply(function() {
                    $scope.initializedNewUploads(target_id);
                  });   

      				    $scope.fineUploaderDragInstances[target_id] = new qq.DragAndDrop({
      				    dropZoneElements: element,
      				    classes: {
      				        dropActive: ""
      				    },

      				    callbacks: {
      				        processingDroppedFiles: function() {
      				          //TODO: display some sort of a "processing" or spinner graphic
      				        },
      				        processingDroppedFilesComplete: function(files, dropTarget) {

                          //$scope.$apply(function(){
                              $scope.fineUploaderInstances[target_id].addFiles(files);
                          //});
      				        }
      				    }
        			});
      		});
      	}
    }


});

function CreateFineUploaderInstance($scope,target_id) {
    fineUploaderBasicInstance = new qq.FineUploaderBasic({
        request: {
        endpoint: BASE_URL+'/ClientIntakeUpload/photoUpload',
        params: {
                token: "",
                uploader_type: ""
        }
        },
        deleteFile: {
            enabled: true,
            endpoint: BASE_URL+'/ClientIntakeUpload/deletePhoto',
            forceConfirm: false,
            method: 'delete'


        },
        sequentialUploads: true,
        retry: {
           enableAuto: true
        },

        multiple:true,
        resume: {
          enabled: true
        },
        onLeave: "Leaving may put some data unsaved. Are you sure?",
        thumbnails: {
            placeholders: {
                waitingPath: BASE_URL+'/assets/plugin/fine-uploader/placeholders/waiting-generic.png',
                notAvailablePath: BASE_URL+'/assets/plugin/fine-uploader/placeholders/not_available-generic.png'
            },
            maxCount:3
        },
     
        
        display:{
          fileSizeOnSubmit:true

        },
        validation: {
            allowedExtensions: $scope.allowedExtensions(target_id)
        },
        autoUpload: true,
        callbacks: {
        	onValidate: function(fileData) {

          },
          processingDroppedFiles: function() {
          },
          processingDroppedFilesComplete: function(files, dropTarget) {
              


          },
          onSubmitted: function(id,name) {

              console.log("onSubmitted")
              var files = $scope.fineUploaderInstances[target_id].getUploads();
              
          },
          onSubmit: function(id, fileName) {

              console.log("onSubmit")
              var file = [];
              file[0] = $scope.fineUploaderInstances[target_id].getFile(id);

              $scope.getSubmittedFiles(target_id,file,id);
              console.log(file[0])
          },
          onStatusChange: function(id,old_status,new_status) {
            
          },
          onError: function() {
            	
          },
          onComplete: function(id,name,responseJSON,xhr) {
            	
              console.log("onComplete")
              var uuid = this.getUuid(id);
              $('#img-'+uuid).show();
            	$('#img-'+uuid).attr('src',responseJSON.url);
            	$('#img-'+uuid).css('opacity',1);

            	$scope.requestUploadedImage(id,responseJSON,this.uploader_type);
          },
          onUpload: function(id,name) {

              var target_id = this.uploader_type;
              $scope.updatePropByUploader(target_id,id);
              
          },

          onDelete: function (id) {
          	
       
          	
          },
          onCancel: function(id,name) {
             
          },  

          onProgress: function(id,name,uploadedBytes,totalBytes) {

            
            var uuid = this.getUuid(id);
            var target_id = String(this.uploader_type);
            console.log("onProgress")
            console.log($scope.uploadedFiles[target_id].photos[id]);

            $('#prog-'+uuid).attr('max',totalBytes);
            $('#prog-'+uuid).attr('value',uploadedBytes);
            
            $scope.uploadedFiles[target_id].photos[id].uploadedBytes = uploadedBytes;
            $scope.uploadedFiles[target_id].photos[id].totalBytes    = totalBytes;
                
            
            console.log("%cUploaded Bytes: "+uploadedBytes+"", "color: green; font-size:12px;"); 
            console.log("%cTotal Bytes: "+totalBytes+"", "color: green; font-size:12px;"); 
        },

        onError: function(id,name,errorReason,xhr) {

        		console.log("error in uploading");
            console.log("%c'"+errorReason+"'", "color: red; font-size:8px;"); 
        
        		
        },

        onDeleteComplete: function(id,xhr,isError) {
            
    	}

        }
  });

    return fineUploaderBasicInstance;

}