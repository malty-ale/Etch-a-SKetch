$(document).ready(function(){

  var countVert=16;
  var countHoriz=16;

  buildBox();
  
  $('#dimensionsSubmit').on('mousedown',function(){
    countVert=$('.formLeft input').val();
    countHoriz=$('.formRight input').val();
    buildBox();
  });

  $('#dimensionsSubmit').on('click',function(){
    event.preventDefault();
    event.stopPropagation();
    $('.formRight input').val("");
    $('.formLeft input').val("");
  })

  function buildBox() {
    $('#sketch').empty();
    for(i = 0; i < countHoriz * countVert; i++){
     var square = "<div class='square'></div>";
     $(square).appendTo('#sketch');
    };

    //$('.square').css({"height" : parseInt($('#sketch').css('height'))/countVert-parseInt($('.square').css('border-width'))*2 + "px", "width" : parseInt($('#sketch').css('width'))/countHoriz-parseInt($('.square').css('border-width'))*2 + "px"});
    $('.square').css({"height" : parseInt($('#sketch').css('height'))/countVert +"px", "width" : parseInt($('#sketch').css('width'))/countHoriz + "px"}); 
  };

  var paintType=0;

  $('.patterns button').on('click',function(){
    event.preventDefault();
    event.stopPropagation();
    paintType = parseInt($(this).val(),10);
    $('.square').css({'opacity':"",'backgroundColor':""});
  });


  $('#sketch').on('mouseenter','.square',function(){
    switch(paintType){
      case 1:
        var color = $(this).css('backgroundColor');
        var rgb = color.match(/\d+/g);
        rgb[0] = parseInt(rgb[0]);
        rgb[1] = parseInt(rgb[1]);
        rgb[2] = parseInt(rgb[2]);
        var increments = 4
        var step = parseInt(255/increments)

        if (rgb[0]<255-step) {
          rgb[0] += step;
          var colorNew = "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")";
        } else if (rgb[1]<255-step) {
          rgb[1] += step;
          var colorNew = "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")";
        }else if (rgb[2]<255-step) {
          rgb[2] += step;
          var colorNew = "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")";
        }
        $(this).css({'backgroundColor': colorNew});
        break;
      case 2:
        var op= $(this).css('opacity');
        if(op>0.3){
          $(this).css({"opacity":op-0.2})
        }
        break;
      case 3:
        $(this).fadeTo(0,0.5);
        break;
      default:
        $(this).css({'backgroundColor':'black'});
    }
  });

  $('#sketch').on('mouseleave','.square',function(){
    switch(paintType){
      case 3:
        $(this).fadeTo(1000,1);
        break;
      default:
        break;
    }
  });

});



