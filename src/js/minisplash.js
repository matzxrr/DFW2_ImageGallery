/*
	minisplash.js - The Mini Unsplash Library
	Author : Matt Greenberg
*/

var unspalsh = (function(){

	/*
		DEFAULT CONSTRUCTOR
	*/
	function Unspalsh(){
		this.API = 'https://api.unsplash.com/';
	};

	/*
		Method Name : encodeParams()
		Description : Takes an object of key value pairs and returns and encoded URI component.
		@param params - Object - A list of key value pairs
		@returns - String - An encoded URI compontent
	*/
	Unspalsh.prototype.encodeParams = function(params){
		var encodedString = '';
		for(var prop in params){
			if(params.hasOwnProperty(prop)){
				if(encodedString.length>0){
					encodedString += '&';
				}
				encodedString += encodeURI(prop + '=' + params[prop]);
			}
		}
		return encodedString;
	};

	/*
		Method Name : makeUrl()
		Description : Takes a URI component and returns the concatenated URL for an API request
		@param uriComponent - String - An encoded URI component
		@returns - String - A URL for an API request
	*/
	Unspalsh.prototype.makeUrl = function(uriComponent, next){
		return this.API + uriComponent
	};

	/*
		Method Name : GET()
		Description : Simple AJAX style GET request
		@param url - String - A Url you wish to GET
		@param next - Function - A callback function that runs when the request is done
	*/
	Unsplash.prototype.GET = function(url, next){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function(){
			if(xhr.status === 200){
				next(xhr.responseText, xhr.status);
			} else {
				next(false, xhr.status);
			}
		};
		xhr.send();
	};

	/*
		Return a 'new' Unspalsh library object
	*/
	return new Unspalsh();

});