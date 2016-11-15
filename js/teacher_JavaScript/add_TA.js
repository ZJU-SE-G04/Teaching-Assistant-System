/**
 * Created by achao_zju on 13/11/2016.
 */
function addTA() {

    var inputNumber=3;

    var tab=document.getElementById("TAInfoTable");
    var colsNum=tab.rows.item(0).cells.length;   //表格的列数
    var rownum=tab.rows.length;//表格当前的行数

    for(var j=0;j<inputNumber;j++){
        tab.insertRow(rownum+j);
        for(var i=0;i<colsNum; i++) {
            tab.rows[rownum+j].insertCell(i);//插入列
        }

        tab.rows[rownum+j].cells[0].innerHTML = "<b>3130101437</b>";
        tab.rows[rownum+j].cells[1].innerHTML = "<b>特朗普</b>";
        tab.rows[rownum+j].cells[2].innerHTML = "<b>房地产设计院</b>";
        tab.rows[rownum+j].cells[3].innerHTML = "<b>建筑景观</b>";
    }






}