/**
 * Created by achao_zju on 13/11/2016.
 */
function addTA() {
    var tab=document.getElementById("TAInfoTable");
    var colsNum=tab.rows.item(0).cells.length;   //表格的列数
    var rownum=tab.rows.length;//表格当前的行数

    tab.insertRow(rownum);
    for(var i=0;i<colsNum; i++)
    {
        tab.rows[rownum].insertCell(i);//插入列
        tab.rows[rownum].cells[i].innerHTML="dfd";
    }


}