"use strict";

$(document).ready(function () {
  $("#display_cagr").click(function () {
    $("#cagr_img").fadeIn(1400);
  });

  $("#remove_cagr").click(function () {
    $("#cagr_img").fadeOut(1400);
  });

  $("#amountcheck").hide();
  $("#returncheck").hide();
  $("#tenure_check").hide();
  //For validation at the time of submit
  let user_err = true;
  let pass_err = true;
  let cpass_err = true;

  $("#Invest_amount").keyup(function () {
    /*
        here we take function beacuse at the time of submit i also want to validate filds.
        */
    Invest_amount();
  });

  function Invest_amount() {
    let user_val = $("#Invest_amount").val();

    if (user_val.length == "") {
      $("#amountcheck").show();
      $("#amountcheck").html("**please enter some amount");
      $("#amountcheck").css("color", "red");
      $("#Invest_amount").css("borderColor", "red");
      user_err = false;
      return false;
    }
    if (user_val <= 0) {
      $("#amountcheck").show();
      $("#amountcheck").html("**please enter the amount greater than 0");
      $("#amountcheck").css("color", "red");
      $("#Invest_amount").css("borderColor", "red");
      user_err = false;
      return false;
    } else {
      $("#Invest_amount").css("borderColor", "#1cb83d");
      $("#amountcheck").hide();
    }
  }

  $("#return_rate").keyup(function () {
    return_rate_check();
  });

  function return_rate_check() {
    let pass_val = $("#return_rate").val();

    if (pass_val.length == "") {
      $("#returncheck").show();
      $("#returncheck").html("**please enter the expected return");
      $("#returncheck").focus();
      $("#returncheck").css("color", "red");
      $("#return_rate").css("borderColor", "red");

      pass_err = false;
      return false;
    }

    if (pass_val < 0 || pass_val > 50) {
      $("#returncheck").show();
      $("#returncheck").html(
        "**please enter the return greater than 0 and less than 50"
      );
      $("#returncheck").focus();
      $("#returncheck").css("color", "red");
      $("#return_rate").css("borderColor", "red");

      pass_err = false;
      return false;
    } else {
      $("#return_rate").css("borderColor", "#1cb83d");

      $("#returncheck").hide();
    }
  }

  $("#tenure").keyup(function () {
    tenure_check();
  });

  function tenure_check() {
    let cpass_str = $("#tenure").val();

    if (cpass_str.length == "") {
      $("#tenure_check").show();
      $("#tenure_check").html("**please enter the value of tenure");
      $("#tenure_check").focus();
      $("#tenure_check").css("color", "red");
      $("#tenure").css("borderColor", "red");

      cpass_err = false;
      return false;
    }
    if (cpass_str <= 0 || cpass_str > 50) {
      $("#tenure_check").show();
      $("#tenure_check").html(
        "**please enter the tenure value greater than 0 and less than 50"
      );
      $("#tenure_check").focus();
      $("#tenure_check").css("color", "red");
      $("#tenure").css("borderColor", "red");

      pass_err = false;
      return false;
    } else {
      $("#tenure").css("borderColor", "#1cb83d");

      $("#tenure_check").hide();
    }
  }

  $("#submit_button").click(function () {
    user_err = true;
    pass_err = true;
    cpass_err = true;

    Invest_amount();
    return_rate_check();
    tenure_check();

    if (user_err == true && pass_err == true && cpass_err == true) {
      let user_val = $("#Invest_amount").val();
      let pass_val = $("#return_rate").val();
      let cpass_str = $("#tenure").val();
      let total = (user_val * (1 + pass_val / 100)) ^ cpass_str;
      $("#ta").html(total);
      $("#mta").html(total - user_val);
      $("#td").html(user_val);
      return false;
    } else {
      return false;
    }
  });
});

$(function () {
  $("#accordion").accordion({
    collapsible: true,
    icons: {
      header: "ui-icon-caret-1-e",
      activeHeader: "ui-icon-caret-1-s",
    },
    animate: 700,
  });
});
