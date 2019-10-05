
//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
  if (Object.keys(e.parameter).length === 0) {
    // JSON
    var data = JSON.parse(e.postData.contents);
    var params = JSON.stringify(e.postData.contents);
    params = JSON.parse(params);
  } else {
    // QueryString
    var data = e.parameter;
  }
  
  if (data.hasOwnProperty('affiliate') && data.hasOwnProperty('productName')) {
    insert_abandono_de_carrinho(data, params);
    
  } else if (data.hasOwnProperty('cancellationDate')) {
    insert_cancelamento_de_assinatura(data, params);
    
  } else if (data.hasOwnProperty('switchPlanDate')) {
    insert_troca_de_plano(data, params);    
    
  } else {
    insert_compra(data);

  }

  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("post request received");
}

// Abandono de carrinho
function insert_abandono_de_carrinho(data, params) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("_Abandono de carrinho");
  var lastRow = Math.max(sheet.getLastRow(),1);

  sheet.insertRowAfter(lastRow);
  
  sheet.getRange(lastRow + 1, 1).setValue(new Date());
  sheet.getRange(lastRow + 1, 2).setValue(data.affiliate);
  sheet.getRange(lastRow + 1, 3).setValue(data.productName);
  sheet.getRange(lastRow + 1, 4).setValue(data.productUcode);
  sheet.getRange(lastRow + 1, 5).setValue(data.productCategory);
  sheet.getRange(lastRow + 1, 6).setValue(data.buyerVO.name);
  sheet.getRange(lastRow + 1, 7).setValue(data.buyerVO.email);
  sheet.getRange(lastRow + 1, 8).setValue(data.buyerVO.phone);
  sheet.getRange(lastRow + 1, 9).setValue("v1");
  sheet.getRange(lastRow + 1, 10).setValue(params);
}

// Cancelamento de Assinatura"
function insert_cancelamento_de_assinatura(data, params) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("_Cancelamento de Assinatura");
  var lastRow = Math.max(sheet.getLastRow(),1);
  
  sheet.getRange(lastRow + 1, 1).setValue(new Date());
  sheet.getRange(lastRow + 1, 2).setValue(data.subscriptionId);
  sheet.getRange(lastRow + 1, 3).setValue(data.subscriberCode);
  sheet.getRange(lastRow + 1, 4).setValue(data.cancellationDate);
  sheet.getRange(lastRow + 1, 5).setValue(data.userName);
  sheet.getRange(lastRow + 1, 6).setValue(data.userEmail);
  sheet.getRange(lastRow + 1, 7).setValue(data.actualRecurrenceValue);
  sheet.getRange(lastRow + 1, 8).setValue(data.productName);
  sheet.getRange(lastRow + 1, 9).setValue(data.subscriptionPlanName);
  sheet.getRange(lastRow + 1, 10).setValue(params);
  sheet.getRange(lastRow + 1, 11).setValue("v1");
}


// Troca de plano
function insert_troca_de_plano(data, params) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("_Troca de Plano");
  var lastRow = Math.max(sheet.getLastRow(),1);
  
  sheet.getRange(lastRow + 1, 1).setValue(new Date());
  sheet.getRange(lastRow + 1, 2).setValue(data.switchPlanDate);
  sheet.getRange(lastRow + 1, 3).setValue(data.subscription.product.id);
  sheet.getRange(lastRow + 1, 4).setValue(data.subscription.product.name);
  sheet.getRange(lastRow + 1, 5).setValue(data.subscription.recurrenceNumber);
  sheet.getRange(lastRow + 1, 6).setValue(data.subscription.status);
  sheet.getRange(lastRow + 1, 7).setValue(data.subscription.subscriber.code);
  sheet.getRange(lastRow + 1, 8).setValue(data.subscription.subscriber.user.name);
  sheet.getRange(lastRow + 1, 9).setValue(data.subscription.plan.name);
  sheet.getRange(lastRow + 1, 10).setValue(data.subscription.plan.recurrencyPeriod);
  sheet.getRange(lastRow + 1, 11).setValue(data.subscription.plan.offer.key);
  sheet.getRange(lastRow + 1, 12).setValue(data.subscription.plan.value);
  sheet.getRange(lastRow + 1, 13).setValue(data.subscription.plan.currencyCode);
  sheet.getRange(lastRow + 1, 14).setValue(data.newSubscriptionPlan.name);
  sheet.getRange(lastRow + 1, 15).setValue(data.newSubscriptionPlan.recurrencyPeriod);
  sheet.getRange(lastRow + 1, 16).setValue(data.newSubscriptionPlan.offer.key);
  sheet.getRange(lastRow + 1, 17).setValue(data.newSubscriptionPlan.value);
  sheet.getRange(lastRow + 1, 18).setValue(data.newSubscriptionPlan.currencyCode);
  sheet.getRange(lastRow + 1, 19).setValue(data.previousSubscriptionPlan.name);
  sheet.getRange(lastRow + 1, 20).setValue(data.previousSubscriptionPlan.recurrencyPeriod);
  sheet.getRange(lastRow + 1, 21).setValue(data.previousSubscriptionPlan.offer.key);
  sheet.getRange(lastRow + 1, 22).setValue(data.previousSubscriptionPlan.value);
  sheet.getRange(lastRow + 1, 23).setValue(data.previousSubscriptionPlan.currencyCode);
  sheet.getRange(lastRow + 1, 24).setValue(params);
  sheet.getRange(lastRow + 1, 25).setValue("v1");
}

// Compras
function insert_compra(data) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("_Transações");
  var lastRow = Math.max(sheet.getLastRow(),1);

  sheet.insertRowAfter(lastRow);

  sheet.getRange(lastRow + 1, 1).setValue(new Date());
  sheet.getRange(lastRow + 1, 2).setValue(data.hottok);
  sheet.getRange(lastRow + 1, 3).setValue(data.prod);
  sheet.getRange(lastRow + 1, 4).setValue(data.prod_name);
  sheet.getRange(lastRow + 1, 5).setValue(data.off);
  sheet.getRange(lastRow + 1, 6).setValue(data.price);
  sheet.getRange(lastRow + 1, 7).setValue(data.aff);
  sheet.getRange(lastRow + 1, 8).setValue(data.aff_name);
  sheet.getRange(lastRow + 1, 9).setValue(data.email);
  sheet.getRange(lastRow + 1, 10).setValue(data.name);
  sheet.getRange(lastRow + 1, 11).setValue(data.first_name);
  sheet.getRange(lastRow + 1, 12).setValue(data.last_name);
  sheet.getRange(lastRow + 1, 13).setValue(data.doc);
  sheet.getRange(lastRow + 1, 14).setValue(data.phone_local_code);
  sheet.getRange(lastRow + 1, 15).setValue(data.phone_number);
  sheet.getRange(lastRow + 1, 16).setValue(data.phone_checkout_local_code);
  sheet.getRange(lastRow + 1, 17).setValue(data.phone_checkout_number);
  sheet.getRange(lastRow + 1, 18).setValue(data.address);
  sheet.getRange(lastRow + 1, 19).setValue(data.address_number);
  sheet.getRange(lastRow + 1, 20).setValue(data.address_country);
  sheet.getRange(lastRow + 1, 21).setValue(data.address_district);
  sheet.getRange(lastRow + 1, 22).setValue(data.address_comp);
  sheet.getRange(lastRow + 1, 23).setValue(data.address_city);
  sheet.getRange(lastRow + 1, 24).setValue(data.address_state);
  sheet.getRange(lastRow + 1, 25).setValue(data.address_zip_code);
  sheet.getRange(lastRow + 1, 26).setValue(data.transaction);
  sheet.getRange(lastRow + 1, 27).setValue(data.xcod);
  sheet.getRange(lastRow + 1, 28).setValue(data.src);
  sheet.getRange(lastRow + 1, 29).setValue(data.status);
  sheet.getRange(lastRow + 1, 30).setValue(data.payment_engine);
  sheet.getRange(lastRow + 1, 31).setValue(data.payment_type);
  sheet.getRange(lastRow + 1, 32).setValue(data.hotkey);
  sheet.getRange(lastRow + 1, 33).setValue(data.name_subscription_plan);
  sheet.getRange(lastRow + 1, 34).setValue(data.subscriber_code);
  sheet.getRange(lastRow + 1, 35).setValue(data.recurrency_period);
  sheet.getRange(lastRow + 1, 36).setValue(data.recurrency);
  sheet.getRange(lastRow + 1, 37).setValue(data.cms_marketplace);
  sheet.getRange(lastRow + 1, 38).setValue(data.cms_vendor);
  sheet.getRange(lastRow + 1, 39).setValue(data.cms_aff);
  sheet.getRange(lastRow + 1, 40).setValue(data.coupon_code);
  sheet.getRange(lastRow + 1, 41).setValue(data.callback_type);
  sheet.getRange(lastRow + 1, 42).setValue(data.subscription_status);
  sheet.getRange(lastRow + 1, 43).setValue(data.transaction_ext);
  sheet.getRange(lastRow + 1, 44).setValue(data.sck);
  sheet.getRange(lastRow + 1, 45).setValue(data.purchase_date);
  sheet.getRange(lastRow + 1, 46).setValue(data.confirmation_purchase_date);
  sheet.getRange(lastRow + 1, 47).setValue(data.billet_url);
  sheet.getRange(lastRow + 1, 48).setValue(data.currency_code_from);
  sheet.getRange(lastRow + 1, 49).setValue(data.original_offer_price);
  sheet.getRange(lastRow + 1, 50).setValue(data.currency);
  sheet.getRange(lastRow + 1, 51).setValue(data.signature_status);
  sheet.getRange(lastRow + 1, 52).setValue(data.billet_barcode);
  sheet.getRange(lastRow + 1, 53).setValue(data.producer_name);
  sheet.getRange(lastRow + 1, 54).setValue(data.producer_document);
  sheet.getRange(lastRow + 1, 55).setValue(data.producer_legal_nature);
  sheet.getRange(lastRow + 1, 56).setValue(data.currency_code_from_);
  sheet.getRange(lastRow + 1, 57).setValue(data.refusal_reason);
  sheet.getRange(lastRow + 1, 58).setValue(data.doc_type);
  sheet.getRange(lastRow + 1, 59).setValue(data.full_price);
  sheet.getRange(lastRow + 1, 60).setValue(data.warranty_date);
  sheet.getRange(lastRow + 1, 61).setValue(data.cms_aff_currency);
  sheet.getRange(lastRow + 1, 62).setValue(data.product_support_email);
  sheet.getRange(lastRow + 1, 63).setValue(data.amount);
  sheet.getRange(lastRow + 1, 64).setValue(data.aff_cms_rate_currency);
  sheet.getRange(lastRow + 1, 65).setValue(data.aff_cms_rate_commission);
  sheet.getRange(lastRow + 1, 66).setValue(data.aff_cms_rate_conversion);
  sheet.getRange(lastRow + 1, 67).setValue(data.installments_number);
  sheet.getRange(lastRow + 1, 68).setValue(data.receiver_type);
  sheet.getRange(lastRow + 1, 69).setValue(data.productOfferPaymentMode);
  sheet.getRange(lastRow + 1, 70).setValue(data.has_co_production);
  sheet.getRange(lastRow + 1, 71).setValue(data);
  sheet.getRange(lastRow + 1, 72).setValue("v1");
}
