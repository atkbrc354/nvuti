                            function login() {
                                if ($('#userLogin').val().length < 4) {
                                    $('#error_enter').css('display', 'block');
                                    return $('#error_enter').html('Логин от 4 символов');
                                }
                                if ($('#userPass').val() == '') {
                                    $('#error_enter').css('display', 'block');
                                    return $('#error_enter').html('Введите пароль');
                                }
                                $.ajax({
                                    type: 'POST',
                                    url: 'action.php',
                                    beforeSend: function() {
                                        $('#butEnter').html('<div class="loader" style="height:23px;width:23px"></div>');
                                        $('#butEnter').addClass('disabled');
                                        $('#error_enter').hide();
                                    },
                                    data: {
                                        type: "login",
                                        login: $('#userLogin').val(),
                                        pass: $('#userPass').val()
                                    },
                                    success: function(data) {
                                        $('#butEnter').html('Войти');
                                        $('#butEnter').removeClass('disabled');
                                        var obj = jQuery.parseJSON(data);
                                        if ('success' in obj) {
                                            Cookies.set('sid', obj.success.sid, { expires: 365,path: '/',secure:true });
                                            Cookies.set('login', $('#userLogin').val(), { expires: 365,path: '/',secure:true });
                                            window.location.href = '';
                                            // return false;
                                        }else{
                                        $('#error_enter').html(obj.error);
                                        $('#error_enter').css('display', 'block');
                                        }
                                    }
                                });
                            }
                            function register() {
                                if ($('#userRegsiter').val().length < 4) {
                                    $('#error_register').css('display', 'block');
                                    return $('#error_register').html('Логин от 4 символов');
                                }
                                if ($('#userPassRegister').val() == '') {
                                    $('#error_register').css('display', 'block');
                                    return $('#error_register').html('Введите пароль');
                                }
                                if ($('#userPassRegister1').val() !== $('#userPassRegister').val()) {
                                    $('#error_register').css('display', 'block');
                                    return $('#error_register').html('Пароли не совпадают');
                                }
                                if($('#CheckBox_9').prop('checked')) {
                                } else {
                                    $('#error_register').css('display', 'block');
                                    return $('#error_register').html('Соглашение');
                                }
                                $.ajax({
                                    type: 'POST',
                                    url: 'action.php',
                                    beforeSend: function() {
                                        $('#butRegister').html('<div class="loader" style="height:23px;width:23px"></div>').addClass('disabled');
                                        $('#error_register').hide();
                                    },
                                    data: {
                                        type: "register",
                                        login: $('#userRegsiter').val(),
                                        ref: Cookies.get('ref'),
                                        pass: $('#userPassRegister').val()
                                    },
                                    success: function(data) {
                                        $('#butRegister').html('Зарегистрироваться').removeClass('disabled');
                                        $('#error_register').hide();
                                        var obj = jQuery.parseJSON(data);
                                        if ('success' in obj) {
                                            Cookies.set('sid', obj.success.sid, { expires: 365,path: '/',secure:true });
                                            Cookies.set('login', $('#userLogin').val(), { expires: 365,path: '/',secure:true });
                                            window.location.href = '';
                                            // return false;
                                        }else{
                                        $('#error_register').html(obj.error);
                                        $('#error_register').show();
                                        }
                                    }
                                });
                            }