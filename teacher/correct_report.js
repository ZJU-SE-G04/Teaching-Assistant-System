/**
 * Created by Rexxar on 2016/11/22.
 */

/*
 <th>姓名</th>
 <th>学号</th>
 <th>实验报告名称</th>
 <th>最后提交时间</th>
 <th>成绩</th>
 <th>批改</th>
 是否评价
 */

function displayCorrect() {
    document.getElementById("report_main").style.display = "none";
    document.getElementById("correct_report1").style.display = "inline";
}

function test1() {
    alert("hello1");
}

function test2() {
    alert("hello2");
}
function test3() {
    alert("hello3");
}
function cheat() {
    // console.log("xxx")
    // console.log($("#reportAllStudent"));
    var correct=$(".re-correct");
    var score=correct.find("input").val();
    // console.log(score);
    $("#correct_report1").find(".re-score").text(score);
    $("#correct_report1").find(".if-correct").text("已批改");
    $("#firstCorrect").find(".re-co-id").text("3140101003");
    $("#firstCorrect").find(".re-co-name").text("谢俊西");

}
function add_report() {
    var re_to_show=$(".re-to-show")
    re_to_show.show();
    var id=$('#report_main').find("#id").val();
    var name=$('#report_main').find("#name").val();
    var time=$('#report_main').find("#deadline").val();
    var number=$('#report_main').find("#re-report-number").val();


    console.log(id);
    re_to_show.find(".re-show-id").text(id);
    re_to_show.find(".re-show-name").text(name);
    re_to_show.find(".re-show-time").text(time);
    re_to_show.find(".re-show-number").text(number+'/'+number);


    // re_to_show.find(".re-show-i").text("实验报告名称");




}
function correctReport() {
    var JSON_STR = [
        {
            "name": "谢俊东",
            "id": "3140101001",
            "filename": "report_001.zip",
            "ddl": "2016-11-15 21:30:00",
            "score": "98",
            "file": "http://www.baidu.com",
            "state": "1"
        },
        {
            "name": "谢俊南",
            "id": "3140100000",
            "filename": "report_001.zip",
            "ddl": "2016-11-15 22:00:00",
            "score": "-1",
            "file": "../file/report/res.doc",
            "state": "0"
        },
        {
            "name": "谢俊西",
            "id": "3140101003",
            "filename": "report_001.zip",
            "ddl": "2016-11-15 22:00:00",
            "score": "-1",
            "file": "http://www.baidu.com",
            "state": "0"
        }
    ];

    var stuReport = JSON_STR;

    var o1 = document.getElementById("firstCorrect");
    if(o1.firstChild) {
        o1.innerHTML = null;
    }
    for(var i in stuReport) {
        if(stuReport[i].state=="0"){
            var name = document.createElement("td");
            name.className+='re-co-name';
            var id = document.createElement("td");
            id.className+='re-co-id';
            var filename = document.createElement("td");
            var ddl = document.createElement("td");
            var file = document.createElement("td");

            o1.appendChild(name);
            o1.appendChild(id);
            o1.appendChild(filename);
            o1.appendChild(ddl);
            o1.appendChild(file);

            name.innerHTML = stuReport[i].name;
            id.innerHTML = stuReport[i].id;
            filename.innerHTML = stuReport[i].filename;
            ddl.innerHTML = stuReport[i].ddl;
            var a = document.createElement("a");
            file.appendChild(a);
            a.href = stuReport[i].file;
            a.className = "icon-black";
            var spana = document.createElement("span");
            a.append(spana);
            spana.className = "glyphicon glyphicon-arrow-down";

            break;
        }
    }


    var o = document.getElementById("reportAllStudent");
    if(o.firstChild) {
        o.innerHTML = null;
    }

    for (var i in stuReport) {
        var tr = document.createElement("tr");
        o.appendChild(tr);

        var name = document.createElement("td");
        var id = document.createElement("td");
        var filename = document.createElement("td");
        var ddl = document.createElement("td");
        var score = document.createElement("td");
        var correct = document.createElement("td");

        tr.appendChild(name);
        tr.appendChild(id);
        tr.appendChild(filename);
        tr.appendChild(ddl);
        tr.appendChild(score);
        if(stuReport[i].name=='谢俊南'){
            score.className+="re-score";
            correct.className+='if-correct';
        }
        tr.appendChild(correct);

        name.innerHTML = stuReport[i].name;
        id.innerHTML = stuReport[i].id;

        var a = document.createElement("a");
        filename.appendChild(a);
        a.href = stuReport[i].file;
        a.innerHTML = stuReport[i].filename;

        ddl.innerHTML = stuReport[i].ddl;
        if (stuReport[i].state=="1") {
            score.innerHTML = stuReport[i].score;
            correct.innerHTML = "已批改";
        }
        else {
            score.innerHTML = "--";
            correct.innerHTML = "未批改";
        }


    }
}

