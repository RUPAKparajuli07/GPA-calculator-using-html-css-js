var irow = 0;
$(document).ready(function () {
    $("#calcbtn").click(Calc);
    $("#resetbtn").click(OnReset);
    $("#addrow").click(AddRow);
    $("#calcbtn2").click(Calc2);
    for (i = 0; i < 6; i++)
        AddRow();
});


function OnReset() {
    $("#gpacircle").hide();
}
function Calc() {
    var glook = [-1, 4.00, 3.67, 3.33, 3.00, 2.67, 2.33, 2.00, 1.67, 1.33, 1.00, 0.67, 0, -1, -1];
    var gpa = 0;
    var sum = 0;
    var txt1 = "";
    var txt2 = "";
    for (var i = 1; i <= irow + 1; i++) {
        hours = $("#tbl > tbody > tr:nth-child(" + i + ") > td:nth-child(3) > input").val();
        hours = parseFloat(hours);
        igrade = $("#tbl > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > select").prop("selectedIndex");
        grade = glook[igrade];
        if (hours > 0 && grade >= 0) {
            gpa += hours * grade;
            sum += hours;
            txt1 += hours + "\u00D7" + grade + "+";
            txt2 += hours + "+";
        }
    }
    cgpa = $("#cgpa").val();
    chours = $("#chours").val();
    cgpa = parseFloat(cgpa);
    chours = parseFloat(chours);
    if (cgpa >= 0 && chours > 0) {
        gpa += chours * cgpa;
        sum += chours;
        txt1 += chours + "\u00D7" + cgpa + "+";
        txt2 += chours + "+";
    }
    gpa /= sum;
    gpa = gpa.toFixed(2);
    txt1 = txt1.slice(0, -1);
    txt2 = txt2.slice(0, -1);
    var txt = "(" + txt1 + ") / (" + txt2 + ") = " + gpa;
    $("#gpa").val(gpa);
    $("#total").val(sum);
    $("#area").val(txt);
    var percent = 25 * gpa;
    if (percent > 100) percent = 100;
    $("#gpacircle").percircle({ percent: percent, text: gpa });
    $("#gpacircle").show();
}


function AddRow() {
    $('#tbl > tbody > tr').eq(irow++).after("<tr>\
         <td><input type='text' name='class[]' class='form-control' placeholder='class "+ irow + "'></td>\
         <td><select name='grade[]' class='form-control'>\
            <option selected>--</option>\
            <option>A</option>\
            <option>A-</option>\
            <option>B+</option>\
            <option>B</option>\
            <option>B-</option>\
            <option>C+</option>\
            <option>C</option>\
            <option>C-</option>\
            <option>D+</option>\
            <option>D</option>\
            <option>D-</option>\
            <option>F</option>\
            <option>P</option>\
            <option>NP</option>\
         </select></td>\
         <td><input type='number' min='0' step='any' name='hours[]' class='form-control'></td>\
      </tr>");
}
function GetLetterFromGPA(gpa) {
    var letter = "";
    var lettertbl = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    var gpatbl = [4.33, 4.00, 3.67, 3.33, 3.00, 2.67, 2.33, 2.00, 1.67, 1.33, 1.00, 0.67, 0];
    for (var i = 0; i < gpatbl.length; i++)
        if (gpa >= gpatbl[i]) {
            letter = lettertbl[i];
            break;
        }
    return letter;
}


function Calc2() {
    var cgpa = parseFloat($("#curgpa").val());
    var tgpa = parseFloat($("#tgpa").val());
    var chours = parseFloat($("#curhours").val());
    var ahours = parseFloat($("#ahours").val());
    var h = chours + ahours;
    //tgpa=(cgpa*chours+fgpa*ahours)/h
    var fgpa = (h * tgpa - chours * cgpa) / ahours;
    var flet = GetLetterFromGPA(fgpa);
    $("#fgpa").val(fgpa.toFixed(2));
    $("#flet").val(flet);
    var percent = 25 * fgpa;
    if (percent > 100) percent = 100;
    $("#finalcircle").percircle({ percent: percent, text: flet });
    $("#finalcircle").show();
}