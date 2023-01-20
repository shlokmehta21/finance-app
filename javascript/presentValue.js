"use strict";

const getId = (id) => {
  return document.getElementById(id);
};

window.onload = () => {
  $(function () {
    $(document).tooltip();
  });

  getId("future_value").focus();

  getId("calculate").addEventListener("click", () => {
    let futureValue = getId("future_value");
    let periods = getId("periods");
    let rate = getId("rate");
    let result = getId("result");

    if (futureValue.value.trim() == "") {
      getId("future_error").innerHTML = "Future value is required";
      showDialogBox();
      showEffect("#future_value");
      return;
    } else {
      getId("future_error").innerHTML = "\xa0";
    }
    if (periods.value.trim() == "") {
      getId("periods_error").innerHTML = "periods is required";
      showDialogBox();
      showEffect("#periods");
      return;
    } else {
      getId("periods_error").innerHTML = "\xa0";
    }
    if (rate.value.trim() == "") {
      getId("rate_error").innerHTML = "rate is required";
      showDialogBox();
      showEffect("#rate");
      return;
    } else {
      getId("rate_error").innerHTML = "\xa0";
    }

    let resultValue =
      futureValue.value / Math.pow(1 + rate.value / 100, periods.value);
    result.value = resultValue.toFixed(2);
  });
};

function showEffect(id) {
  $(function () {
    // run the currently selected effect
    function runEffect() {
      // get effect type from
      let selectedEffect = "highlight";

      // Run the effect
      $(id).effect(selectedEffect, 500, callback);
    }

    // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function () {
        $(id).removeAttr("style");
      }, 1000);
    }

    runEffect();
  });
}

function showDialogBox() {
  $(function () {
    $("#dialog").dialog();
  });
}
