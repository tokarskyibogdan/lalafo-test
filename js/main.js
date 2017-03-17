jQuery(function ($) {


    // Image input preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image-input-preview').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#image-input").change(function(){
        readURL(this);
    });
    $('#image-input-button').click(function(){
        $("input[type='file']").trigger('click');
    });
    $("input[type='file']").change(function(){
        $('#image-input-validation').text(this.value.replace(/C:\\fakepath\\/i, ''))
    });


    // Notification controls
    $(".close-notification").click(function() {
        $(this).parent().parent().hide();
    });


    // Add and remove additional phone number
    var phoneNumberId = 0;
    $('.btn-add-phone-number').click(function(e){
        e.preventDefault();
        phoneNumberId++;
        $('.phones-section').append('<div class="row no-gutters phone-section"><div class="col-6"><select name="phone-code" id="phone-code"><option value="+380">+380</option><option value="+280">+280</option><option value="+180">+180</option></select><input type="number" id="phone-number" placeholder="+______________________"></div><div class="col-6"><ul class="number-connect"><li><label for="Whatsapp['+ phoneNumberId +']">Whatsapp</label><div class="checkbox-item"><input type="checkbox" value="Whatsapp['+ phoneNumberId +']" id="Whatsapp['+ phoneNumberId +']" name="check" checked /><label for="Whatsapp['+ phoneNumberId +']"></label></div></li><li><label for="Viber['+ phoneNumberId +']">Viber</label><div class="checkbox-item"><input type="checkbox" value="Viber['+ phoneNumberId +']" id="Viber['+ phoneNumberId +']" name="check" /><label for="Viber['+ phoneNumberId +']"></label></div></li><li class="delete-phone-number text-danger">Delete</li></ul></div></div>');
    });
    $('.phones-section').on("click",".delete-phone-number", function(e){
        e.preventDefault();
        $(this).parent().parent().parent().remove();
         phoneNumberId--;
    });


    // Manager additional info show
    $('.manager').on('click', function () {
        $('.manager-add-info').slideToggle("fast");
    });


    // drop-down for schedule
    $(".day-selection").on('click', function() {
        $(this).parent().find('.week-days').slideToggle('fast');
    });

    $('.week-days input[type="checkbox"]').on('click', function() {

        var title = $(this).closest('.week-days').find('input[type="checkbox"]').val(),
            title = $(this).val() + ",";

        if ($(this).is(':checked')) {
            var selectedItem = '<span title="' + title + '">' + title + '</span>';
            $('.select-day-result').append(selectedItem);
            $(".dropdown-day-title").hide();
        } else {
            $('span[title="' + title + '"]').remove();
            var ret = $(".dropdown-day-title");
            $('.day-selection').append(ret);
        }

    });
    $(".time-selection").on('click', function() {
        $(this).parent().find('.schedule').slideToggle('fast');
    });


    $(".time-picker").on("change paste keyup", function() {
        var begintime = $(this).parent().find('.begin-time-picker').val();
        var endtime = $(this).parent().find('.end-time-picker').val();
        $(this).parent().parent().parent().parent().find('.dropdown-time-title').text('From ' + begintime + ' till ' + endtime);
    });
    $('#weekend').on('change', function () {
        if ($(this).is(':checked')) {
            $('.dropdown-time-title').text('Day off');
            $('.time-picker').attr('disabled', 'disabled');
        } else {
            $('.dropdown-time-title').text('Working time');
            $('.time-picker').removeAttr('disabled', 'disabled');
        }
    });

    // Form validation
    $("#form").submit(function(event) {
        var fileUpload = $("#image-input")[0];
        if ((fileUpload.files[0].size) < 4194304) {
            if (typeof (fileUpload.files) != "undefined") {
                var reader = new FileReader();
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        if (height !== 159 || width !== 962) {
                            $("#image-input-error").html("Image is not 962x159 pixels.");
                            return false;
                        }
                        $("#image-input-error").html("");
                        return true;
                    };
                }
            } else {
                alert("This browser does not support HTML5.");
                return false;
            }
        } else {
            $("#image-input-error").html("File size is greater than 4MB, chose other.");
            return false;
        }
        event.preventDefault()
    });

    // Checkbox disabled
    $('.disabled-checkbox-item').find('input').prop('disabled', true);

    var template = $('.schedule-selection:last').clone(true);
    var sectionsCount = 1;
    $('.btn-add-work-day').on('click', function() {
        sectionsCount++;
        var section = template.clone(true).find(':input').each(function(){
            var newId = this.id + sectionsCount;
            $(this).next().attr('for', newId);
            this.id = newId;
        }).end()
            .appendTo('.schedule-section')
    });


});