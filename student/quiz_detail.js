/**
 * Created by Rexxar on 2016/11/23.
 */

function getQuizDetail() {
    var JSON_STR = {
        "quizName": "测试001",
        "question": [
            {
                "questionType": "option",
                "questionId": "1",
                "title": "Three processes are synchronizing on a shared code segment which is protected by a semaphore. If at most two processes are allowed to enter the code segment simultaneously, which of the following results shows the possible values that the semaphore may have?",
                "A": "2, 1, 0, -1",
                "B": "3, 2, 1, 0",
                "C": "2, 1, 0, -1",
                "D": "1, 0, -1, -2"
            },
            {
                "questionType": "option",
                "questionId": "2",
                "title": "题目2",
                "A": "aaa",
                "B": "bbb",
                "C": "ccc",
                "D": "ddd"
            },
            {"questionType": "option", "questionId": "3", "title": "题目3", "A": "一", "B": "二", "C": "三", "D": "四"},
            {"questionType": "essay", "questionId": "4", "title": "题目4"}
        ]
    };

    var quiz = JSON_STR;

    var quizName = quiz.quizName;
    var question = quiz.question;

    // var o = document.body;
    var o = document.getElementById("examin_pane");
    o.innerHTML = null;

    var h3 = document.createElement("h3");
    h3.className = "page-header";
    h3.innerHTML = quizName;
    o.appendChild(h3);

    var form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    o.appendChild(form);

    for (var i = 0; i < question.length; i++) {
        if (question[i].questionType == "option") {

            var div = document.createElement("div");
            form.appendChild(div);
            div.className = "list-group-item-text bs-callout bs-callout-info";
            div.innerText = i + 1 + ". " + question[i].title;

            var radioA = document.createElement("div");
            var radioB = document.createElement("div");
            var radioC = document.createElement("div");
            var radioD = document.createElement("div");
            div.appendChild(radioA);
            div.appendChild(radioB);
            div.appendChild(radioC);
            div.appendChild(radioD);

            radioA.className = "radio";
            radioB.className = "radio";
            radioC.className = "radio";
            radioD.className = "radio";

            var labelA = document.createElement("label");
            var labelB = document.createElement("label");
            var labelC = document.createElement("label");
            var labelD = document.createElement("label");

            radioA.appendChild(labelA);
            radioB.appendChild(labelB);
            radioC.appendChild(labelC);
            radioD.appendChild(labelD);

            labelA.innerHTML = '<input type="radio" name="' + question[i].questionId + '" value="A"> ' + question[i].A;
            labelB.innerHTML = '<input type="radio" name="' + question[i].questionId + '" value="B"> ' + question[i].B;
            labelC.innerHTML = '<input type="radio" name="' + question[i].questionId + '" value="C"> ' + question[i].C;
            labelD.innerHTML = '<input type="radio" name="' + question[i].questionId + '" value="D"> ' + question[i].D;
        }
        else if (question[i].questionType == "essay") {
            var div = document.createElement("div");
            form.appendChild(div);
            div.className = "list-group-item-text bs-callout bs-callout-warning";

            var divTitle = document.createElement("div");
            divTitle.className = "form-group";
            divTitle.innerHTML = i + 1 + ". " + question[i].title;

            var textarea = document.createElement("textarea");
            textarea.className = "form-control";
            textarea.rows = "3";
            textarea.name = question[i].questionId;
            textarea.placeholder = "输入答案";

            div.appendChild(divTitle);
            div.appendChild(textarea);
        }
    }
    var button = document.createElement("button");
    form.appendChild(button);
    button.type = "submit";
    button.className = "btn btn-primary center-block";
    button.innerHTML = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 提交';
}
// window.onload = getQuizDetail;
