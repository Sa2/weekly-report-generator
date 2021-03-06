function setReportTemplate() {
  var numOfWeekday = 5;

  setTempleteToTextarea(genReportTemplete());

  function genReportTemplete() {
    var weekdayList = getWeekdayList(getMondayDate());

    var reportTempleteText = "";

    reportTempleteText += "今週の稼働時間、作業内容及び進捗情報です。\n";
    reportTempleteText += "\n";
    reportTempleteText += "・稼働時間(hrs)\n";

    for (var i = 0; i < weekdayList.length; i++) {
      var month = weekdayList[i].getMonth() + 1;
      reportTempleteText += month.toString() + "/" + weekdayList[i].getDate() + " : \n";
    }
    reportTempleteText += "\n";
    reportTempleteText += "・作業内容\n";
    reportTempleteText += "  ・\n";
    reportTempleteText += "\n";
    reportTempleteText += "・備考\n";
    reportTempleteText += "  ・特になし";

    return reportTempleteText;
  }

  function getWeekdayList(mondayDate) {
    var weekdayList = [];
    var currentDate = new Date(0);
    currentDate = mondayDate;

    var mondayDateForPush = new Date(0);
    mondayDateForPush.setTime(currentDate.getTime());

    weekdayList.push(mondayDateForPush);
    for (var i = 1; i < numOfWeekday; i++) {
      var nextDate = new Date(0);
      currentDate = getNextDate(currentDate);
      nextDate.setTime(currentDate.getTime());
      weekdayList.push(nextDate);
    }

    return weekdayList;
  }

  function getMondayDate() {
    var postedDateStr = document.getElementsByTagName("Table")[0].children[0].children[2].getElementsByTagName("td")[0].innerText;
    var year = postedDateStr.split("年")[0];
    var splitText = postedDateStr.split("年")[1];
    var month = splitText.split("月")[0];
    splitText = postedDateStr.split("月")[1];
    var day = splitText.split("日")[0];

    postedDate = new Date(year + "/" + month + "/" + day);

    // 木曜日に週報提出依頼が来る前提の補正値
    //var numOfRewriteOnMonday = -3;

    // 曜日情報を利用した補正値
    var numOfRewriteOnMonday = searchMondayDate(postedDate);

    return manageDate(postedDate, numOfRewriteOnMonday);
  }

  // 月曜日に補正するための日数を算出する
  function searchMondayDate(currentDate) {
    var correctionValue = 0;
    var mondayDate = 1;

    // 日曜日の場合とそれ以外の日の補正値計算
    if (currentDate.getDay() == 0) {
      correctionValue = -6;
    }
    else {
      correctionValue = (currentDate.getDay() - mondayDate)*-1
    }

    return correctionValue;
  }

  function manageDate(currentDate, num) {
    var changedDate = deepCopyDate(currentDate);
    changedDate.setDate(currentDate.getDate() + num);
    return changedDate;
  }

  function getNextDate(currentDate) {
    return manageDate(currentDate, 1);
  }

  function setTempleteToTextarea(templete) {
    var e = document.getElementsByTagName("textarea")[0];
    e.value = templete;
  }

  function deepCopyDate(sourceDate) {
    var newDate = new Date(sourceDate.getTime());
    return newDate;
  }
}

setReportTemplate();
