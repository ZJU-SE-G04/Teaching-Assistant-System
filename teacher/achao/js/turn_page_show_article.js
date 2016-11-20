/**
 * Created by achao_zju on 13/11/2016.
 */
var article_number=3;
var page_number=Math.ceil(article_number/6);
if(page_number<5){
    document.getElementById("page_five").style.display="none";
}
if(page_number<4){
    document.getElementById("page_four").style.display="none";
}
if(page_number<3){
    document.getElementById("page_three").style.display="none";
}
if(page_number<2){
    document.getElementById("page_two").style.display="none";
}
