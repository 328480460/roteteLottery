//打开规则弹窗
$('.rule').on('touchend',function(){
	$('.active_rule').show();
});
//打开记录弹窗
$('.record').on('touchend',function(){
	$('.record_list').show();
});
//关闭弹窗
$('.close_btn').on('touchend',function(){
	$('.record_list').hide();
	$('.active_rule').hide();
});

//关闭开始、结束、登录、银卡弹窗
$('.add_address1').on('touchend',function(){
	$('.tc_mb').hide();
	$('.address').hide();
});

//随机函数
function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);
}

/*
	当卡牌是背面时，点击后传入类型‘typper’，根据类型确定弹窗类型
*/
//数组随机排序
Array.prototype.shuffle = function() {
	var input = this;
	for (var i = input.length-1; i >=0; i--) {
		var randomIndex = Math.floor(Math.random()*(i+1)); 
		var itemAtIndex = input[randomIndex]; 
		input[randomIndex] = input[i]; 
		input[i] = itemAtIndex;
	}
	return input;
}
//点击抽取

function clickCard(){
	var typper=rnd(0,6);
	//存this
	var _this=$(this).parent();
	//判断点取的礼包类型
	switch(typper){
		case 0:
			$('.super_bag').show();
			break;
		case 1:
			$('.spring_bag').show();
			break;
		case 2:
			$('.ju_side1').show();
			break;
		case 3:
			$('.ju_side2').show();
			break;
		case 4:
			$('.jifen_50').show();
			break;
		case 5:
			$('.jifen_500').show();
			break;
		default:
			break;
	}
	//点击放大
	$(_this).css({
		'transform':'scale(1.15)'
	});
	//礼包的下标
	var arr=[0,1,2,3,4,5];
	function suiji(){
		for(var j=0;j<6;j++){
			if(typper==arr[j]){
				arr.splice(j,1);
			}
		}
		//打乱数组顺序
		arr.shuffle();
		var aLi=$(_this).siblings().find('.zhengmian');
		//随机给剩余的换上图片
		for(var i=0;i<aLi.length;i++){
			$(_this).siblings().find('.zhengmian').eq(i).attr('src','images/SpringFestivalGift/bag'+arr[i]+'.png');
		}
	}
	suiji();
	//弹窗延时弹出
	var timeer2=setTimeout(function(){
		$('.tc_mb').show();
	},500);
	//点击翻牌时效果
	$(_this).find('.fanmian').hide();
	$(_this).find('.zhengmian').show();
	$(_this).find('.zhengmian').attr('src','images/SpringFestivalGift/bag'+typper+'.png');
	//被点击的牌转回正的方向
	$(_this).find('.zhengmian').css({
		'transform':'rotateY(0deg)'
	});
	//解除绑定
	$('.tc_close').off('touchend');
	//关闭礼物弹窗
	$('.tc_close').on('touchend',function(){
		$('.tc_mb').hide();
		//关闭所有弹窗
		$('.jifen_500,.jifen_50,.super_bag,.spring_bag,.ju_side1,.ju_side2,.address').hide();
		$(_this).siblings().css({
			'animation':'flip 1s ease',
			'animation-fill-mode':'forwards'
		});
		//转动的过程中切换图片
		clearTimeout(timeer2);
		var timeer2=setTimeout(function(){
			$('.card_list li .fanmian').hide();
			$('.card_list li .zhengmian').show();
		},200);
		$('.card_list li .zhengmian').css({
			'transform':'rotateY(180deg)'
		});
		$(_this).find('.zhengmian').css({
			'transform':'rotateY(0deg)'
		});
	});
	//开关关闭
	bOk2=false;
}

//1.获取所有li元素位置
var aPos=[];
var aLi=$('.card_list li');
for(var i = 0;i<aLi.length;i++){
	aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
}
//2.存下这些点
for(var i = 0;i<aLi.length;i++){
	aLi[i].style.position = 'absolute';
	aLi[i].style.left = aPos[i].left+'px';
	aLi[i].style.top = aPos[i].top+'px';
	aLi[i].style.margin = 0;
}
//3.寻找定位点
var h=$('.card_list').height();
var w=$('.card_list').width();
var h1=aLi[0].offsetHeight;
var w1=aLi[0].offsetWidth;
var h2=(h-h1)/2;
var w2=(w-w1)/2-10;
var bOk = false;
var bOk2 = false;
var bOk3 = true;

//点击开始运动
$('.begain_btn').on('touchend',function(){
	var isLogin=1,argentumCard=1,isBegin=1,isEnd=0;
	//卡牌大小恢复
	$('.card_list li').css('transform','scale(1)');
	//当运动未完成并未触发条件是禁止在点击按钮
	if(bOk2){return;}
	bOk2 = true;
	//是否登录
	if(isLogin){
		//是否银卡及以上
		if(argentumCard){
			//是否开始
			if(isBegin){
				//是否结束
				if(isEnd){
					$('.tc_mb').show();
					$('.tc_end').show();
				}else{
					//获取次数
					var num=Number($('.surplus_num').html());
					//次数否否大于0
					if(num>0){
						
						$(document).off('touchend','.fanmian');
						num--;
						//运动时禁止点击按钮
						if(bOk){return;}
						bOk = true;
						//整个块转身
						$('.card_list li').css({
							'animation':'flip 0.5s ease',
							'animation-fill-mode':'forwards'
						});
						//转动的过程中切换图片
						clearTimeout(timeer1);
						var timeer1=setTimeout(function(){
							$('.card_list li .zhengmian').hide();
							$('.card_list li .fanmian').show();
							$('.card_list li .fanmian').css('transform','rotateY(-180deg)');
						},200);
						clearTimeout(timeer2);
						var timeer2=setTimeout(function(){
							for(var i = 0;i<aLi.length;i++){
								(function(index){
									setTimeout(function(){
										move(aLi[index],{left:w2,top:h2},{complete:function(){
											//判断是不是最后一个收完了
											if(index == aLi.length-1){
												$('.card_list li').css('animation','shrink 1s ease');
												$('.card_list li .fanmian').css({
													'transform':'rotateY(0deg)'
												});
												for(var i = aLi.length-1;i>=0;i--){
													(function(index){
														setTimeout(function(){
															move(aLi[index],{left:aPos[index].left,top:aPos[index].top},{
																complete:function(){
																	if(index == 0){
																		bOk =false;
																		$(document).on('touchend','.fanmian',clickCard);
																	}	
																}															
															});
														},300);
													})(i);
												}
											}	
										}});
									},300);
								})(i);
							}
						},500);
						//次数赋值
						$('.surplus_num').html(num);
					}else{
						$('.tc_mb').show();
						$('.tc_share').show();
					}
				}
			}else{
				$('.tc_mb').show();
				$('.tc_begain').show();
			}
		}else{
			$('.tc_mb').show();
			$('.tc_yinka').show();
		}
	}else{
		$('.tc_mb').show();
		$('.no_login').show();
	}
});








