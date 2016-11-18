/**
 * Created by achao_zju on 15/11/2016.
 */
function addArtcile() {
    
}

function showArticleDetails(){


    var articleDetails=document.createElement("div");
    articleDetails.id="articleDetails";


    var childArtcile=document.createElement("div")
    articleDetails.appendChild(childArtcile);
    childArtcile.className="panel panel-default";
    childArtcile.innerHTML="<div class='panel-heading'> "+
    "<div class='row'> <div class='col-sm-9'>热烈庆祝长者90大寿！ </div> <div class='col-sm-1'>膜法师 </div> " +
    "<div class='col-sm-2'>2016-11-9 </div> </div> " +
    "</div> <div class='panel-body'>这里是部分文章内容，<=140字注：需要后端返回文章作者，文章标题，发布时间，文章不超过140字内容" +
    "同时为了实现翻页，需要返回文章数量 </div>";


}