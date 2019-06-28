import { observable, action, toJS } from "mobx";

class ProfileStore {

  constructor(props) {
    this.initData();
  }

  @observable visible = false;
  @observable options =[];
  @observable selectedItemOnAutoComplete;
  @observable eventMap = new Map();
  @observable selectedData;
  @observable suggestionsData =[];
  @observable paginationData = [];
  @observable currentPage;
  @observable loadPagination = false;



  @action initData = () => {
    this.getSuggestions("netflix");
  };

  @action handleOnAutoComplete = value => {
    this.selectedItemOnAutoComplete = value;
    //this.selectedData = value.label;
    this.getSuggestions(value.label);
  };

  @action handleInputChange = value => {
    //this.selectedData = value
    this.getSuggestions(value);
  };

  

  @action handleOnNextPage = value => {
    this.getSuggestions(this.selectedData,(this.currentPage-1)*100);
  };

  
  @action getSuggestions = (val,offset=0) => {
    if(!val){
      return;
    }
    this.selectedData = val
    const request = require("request");
    let YOUR_API_KEY = 'o9hma0uuIBFkVtYxY8HxF648MrZUBIgj' ;
    let that = this;
    
    let url = `http://api.giphy.com/v1/gifs/search?q=${val}&api_key=${YOUR_API_KEY}&limit=100&offset=${offset}`
    request(url, function (error, response, body) {
      if (response) {
        let res = JSON.parse(response.body);
        that.paginationData = res["pagination"];
        that.suggestionsData = res["data"];
        let suggestions = toJS(res["data"]);

        let options = suggestions.map((item)=>{
          let video= "https://i.giphy.com/media/" + item["id"] + "/giphy.mp4";
          let gif = "https://i.giphy.com/" + item["id"] + ".gif";
          let obj={value: item["title"], label: item["title"], mp4:video, gif:gif };
          return obj;
        })
        that.eventMap.set(that.currentPage, {'pagination':that.paginationData, 'options':options})
      }
    });
  };

};

export default new ProfileStore();
