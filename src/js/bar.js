"use strict";

var baseUrl = "https://cgbarbackend.azurewebsites.net";
var pauseTimer = true;

var app = new Vue({
  el: '#barapp',
  data: {
    barPatrons: [],
    barTenderMessages : [],
    barStatus: ""
  },
  computed: {
    displayMessages: function(){
      return this.barTenderMessages.slice(0,2)
    },
    showDefaultMessage: function(){
      return this.displayMessages.length < 1
    }
  },
  mounted: function(){
    var context = this;
    axios.get(baseUrl + '/Bar/Patrons')
      .then(function (response) {
        // handle success
        console.log(response);
        context.barPatrons = response.data;
        context.barStatus = "OPEN";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        context.barStatus = "CLOSED";
      });

    var connection = new signalR.HubConnectionBuilder().withUrl(baseUrl + "/signalR/TwitterBar").build();

    connection.on("Ping", function () {
      console.log("signalR ping received")
    });

    connection.on("PatronAdded", function(patron){
      context.barPatrons.push(patron)
    });

    connection.on("DrinkOrdered", function(patron){
      var existingIndex = context.barPatrons.findIndex(item => item.screenName === patron.screenName);
      if(existingIndex >= 0){
        context.barPatrons[existingIndex].drink = patron.drink
      }
    })

    connection.on("DrinkExpired", function(patronScreenName){
      var existingIndex = context.barPatrons.findIndex(item => item.screenName === patronScreenName);
      if(existingIndex >= 0){
        context.barPatrons[existingIndex].drink = "empty";
      }
    })

    connection.on("PatronExpired", function(patronScreenName){
      var existingIndex = context.barPatrons.findIndex(item => item.screenName === patronScreenName);
      if(existingIndex >= 0){
        context.barPatrons.splice(existingIndex,1)
      }
    })

    connection.start().then(function () {
      console.log("Connection to signalR hub started")
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("PatronPolitenessChanged", function(patron){
      var existingIndex = context.barPatrons.findIndex(item => item.screenName === patron.screenName);
      if(existingIndex >= 0){
        context.barPatrons[existingIndex].isPolite = patron.isPolite
      }
    })

    connection.on("BarTenderMessage", function(message){
      console.log("BarTenderMessage",message)
        context.barTenderMessages.push(message)
    })

    setInterval(() =>{
      if(pauseTimer == true){
        if(this.barTenderMessages.length > 0){
          pauseTimer = false;
        }
        return;
      }

      this.barTenderMessages.splice(0,1);
      if(this.barTenderMessages.length < 1){
          pauseTimer = true;
        }
    }, 10000);
  }
})