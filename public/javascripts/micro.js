$(document).ready(function (){

	function micro(){

		this.arr = 0;

		this._event();

		this._input();

	}
	/**
	 * 事件绑定
	 */
	micro.prototype._event = function(){

		var that = this;

		$('.registration').on('click', function(){

			$('.micro-register').removeClass('none');

			$('.occlusion').removeClass('none');

			$('.shut').on('click',function(){

				$('.micro-register').addClass('none');

				$('.occlusion').addClass('none');

			})
		})

		$('.Login').on('click',function(){

			$('.micro-entry').removeClass('none');

			$('.occlusion').removeClass('none');

		})

		$('.EnNumber').on('input propertychange',function(){

			var name = $(this).val();

			that._useAjax(name);

		})

		$('.Nickname').on('input propertychange',function(){

			var nickname = $(this).val();

			that._nicknameAjax(nickname);

		})

		$('.retreat').on('click',function(){

			window.location.href = "http://localhost:3000/";

		})

	}
	/**
	 * 用户查询
	 */
	micro.prototype._useAjax = function(name){

		var that = this;

		$.ajax({ 
			url: "http://localhost:3000/users/queryByName",
			type:'Get',
			dataType:"json",
			data:{
				name:name
			},
	    	success: function(data){
				if(data.length !== 0){
					$('#prompt').removeClass('none');
					//用户名存在不准提交数据
					that._arr(1);
				}else{
					$('#prompt').addClass('none');
					that._arr(0);
				}
	    	}
			
		})

	}
	/**
	 * 昵称查询
	 */
	micro.prototype._nicknameAjax = function(nickname){

		var that = this;

		$.ajax({ 
			url: "http://localhost:3000/users/queryByNickname",
			type:'Get',
			dataType:"json",
			data:{
				nickname:nickname
			},
	    	success: function(data){
				if(data.length !== 0){
					$('#nicknamePrompt').removeClass('none');
					//昵称存在不准提交数据
					that._arr(1);
				}else{
					$('#nicknamePrompt').addClass('none');
					that._arr(0);
				}
	    	}
			
		})

	}
	/**
	 * 注册用户数据提交
	 */
	micro.prototype._submitAjax = function(){

		var name = $('.EnNumber').val();

		var password = $('.Password').val();

		var sex = $('.sex').val();

		var nickname = $('.Nickname').val();

		$.ajax({ 
			url: "http://localhost:3000/users/addUser",
			type:'get',
			dataType:"json",
			data:{
				name:name,
				password:password,
				sex:sex,
				nickname:nickname
			},
	    	success: function(data){
				
	    		if(data.code === 200 && data.length !==0 ){

	    			layer.confirm('用该注册号登陆', {
					  btn: ['确定','取消'] //按钮
					}, function(){

					  window.location.href = "http://localhost:3000/land?nickname="+nickname+"&sex="+sex;

					}, function(){

					  	$('.micro-register').addClass('none');

						$('.occlusion').addClass('none');

					});

	    		}

	    	}
			
		})

	}

	/**
	 * 
	 */
	micro.prototype._arr = function(num){

		this.arr = num;

	}
	/**
	 * 表单验证
	 */
	micro.prototype._input = function(){

		var that = this;

		$("#jsForm").validate({
			submitHandler: function() {
				if(that.arr === 0){
					that._submitAjax();
				}
			}
		})

		//配置通用的默认提示语
		$.extend($.validator.messages, {
		  required: '必填',
		  equalTo: "请再次输入相同的值"
		});

		//英文和数字
		jQuery.validator.addMethod("EnNumber", function (value, element) {
		    var EnNumber = /^(?!(?:\d*$))[a-zA-Z0-9~!@#$%ßüöä-\s]{0,100}$/;
		  return this.optional(element) || (EnNumber.test(value));
		}, "格式不对");

		//字母开头，长度在6-18之间 只能包含字符、数字和下划线
		jQuery.validator.addMethod("Password", function (value, element) {
		    var password = /^[a-zA-z]\w{5,17}$/;
		  return this.optional(element) || (password.test(value));
		}, "格式不对");
		//中文不超过5位(禁输非法字符)
		jQuery.validator.addMethod("Nickname", function (value, element) {
		    var nickname = /^[\一-\龥]{0,5}$/;
		  return this.optional(element) || (nickname.test(value));
		}, "格式不对");
	}

	new micro();
})