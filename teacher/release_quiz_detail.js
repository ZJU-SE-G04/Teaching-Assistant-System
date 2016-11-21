/**
 * Created by Rexxar on 2016/11/20.
 */
var o=document.body;

function createDiv() {
    var o = document.body;

    var optionQuestionCount = document.getElementById("optionQuestionCount").value;
    var essayQuestionCount= document.getElementById("essayQuestionCount").value;

    document.getElementById("releaseQuizForm").remove();

    var form = document.createElement("form");
    form.action = "#";
    form.method = "post";

    o.appendChild(form);

    for (var i=1;i<=optionQuestionCount;i++) {
        var divOp = document.createElement("div");
        divOp.className = "list-group-item-text bs-callout bs-callout-info";
        {
            var label = document.createElement("label");
            var textarea = document.createElement("textarea");

            label.for=i;
            label.className = "control-label";
            label.innerHTML=i+'.';

            textarea.className="form-control form-group";
            textarea.rows = "3";
            textarea.id=i;
            textarea.placeholder = "输入题目";

            divOp.appendChild(label);
            divOp.appendChild(textarea);

            for(var j=1;j<=4;j++) {
                var divOption = document.createElement("div");
                divOption.className = "input-group form-group";

                var span = document.createElement("span");
                span.className = "input-group-addon";

                var inputSpan = document.createElement("input");
                inputSpan.type = "radio";
                inputSpan.name=i;
                span.appendChild(inputSpan);

                var input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                var ch;
                j == 1 && (ch = "A") || j == 2 && (ch = "B") || j == 3 && (ch = "C") || j == 4 && (ch = "D");
                input.placeholder = "输入" + ch + "选项";

                divOption.appendChild(span);
                divOption.appendChild(input);

                divOp.appendChild(divOption);
            }
        }
        form.appendChild(divOp);
    }

    for (var i=optionQuestionCount*1+1;i<=essayQuestionCount*1+optionQuestionCount*1;i++) {
        var divOp = document.createElement("div");
        divOp.className = "list-group-item-text bs-callout bs-callout-warning";
        {
            var label = document.createElement("label");
            var textarea = document.createElement("textarea");

            label.for=i;
            label.className = "control-label";
            label.innerHTML=i+'.';

            textarea.className="form-control form-group";
            textarea.rows = "3";
            textarea.id=i;
            textarea.placeholder = "输入主观题题目";

            divOp.appendChild(label);
            divOp.appendChild(textarea);
        }
        form.appendChild(divOp);
    }

    var button = document.createElement("button");
    button.type = "submit";
    button.className="btn btn-primary center-block";
    var buttonSpan = document.createElement("span");
    button.innerHTML = "<span class=\"glyphicon glyphicon-ok\" ></span> 发布";


    form.appendChild(button);
}