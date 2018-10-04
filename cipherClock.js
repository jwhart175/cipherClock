//MIT License
//Copyright (c) 2018 Jonathan Hart

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

function newCipherClock(keyLength,numGears){
	let cipher = {
		keyLength:0,
		numGears:0,
		passString:"",
		inString:"",
		keyArray:[],

		get testClock() {
			var input = "000102030405060708090a0b0c0d0e0f1012131415161718191a1b1c1d1e1f";
			var output = "";
			var pass = "abcdefghijklmnopqrstuvwxzy0123456789!@#$%^&*()";
			this.setInString(input);
			this.setPass(pass);
			this.setInString(this.encryptText);
			output = this.decryptText;
			if(input === output){
				console.log("Text encryption Successful!");
			} else {
				console.log("Text encryption Failed!");
				console.log("input: " + input);
				console.log("output: " + output);
			}
			this.setInString(input);
			this.setInString(this.encryptHex);
			output = this.decryptHex;
			if(input === output){
				console.log("Hex encryption Successful!");
			} else {
				console.log("Hex encryption Failed!");
				console.log("input: " + input);
				console.log("output: " + output);
			}
		},

		setNumGears:function(input){
			/*
			 *  This function validates the input and then sets the numGears of this cipher
			 *  which is a required input to the encrypt, and decrypt functions
			 *
			 *  Returns true if input is valid, or false if it is not.
			 */
			if(input&&(typeof 10==typeof input)){
				if(input>0){
					this.numGears=input;
					return true;
				} else {
					//console.log("setNumGears Failed!  input must be greater than zero!");
					return false;
				}
			} else {
				//console.log("setNumGears Failed!  No input detected!");
				return false;
			}
		},

		setKeyLength:function(input){
			/*
			 *  This function validates the input and then sets the keyLength of this cipher
			 *  which is a required input to the key, encrypt, and decrypt functions
			 *
			 *  Returns true if input is valid, or false if it is not.
			 */
			if(input&&(typeof 10==typeof input)){
				if(input>3){
					this.keyLength=input;
					return true;
				} else {
					//console.log("setKeyLength Failed!  input must be greater than three!");
					return false;
				}
			} else {
				//console.log("setKeyLength Failed!  No input detected!");
				return false;
			}
		},

		setInString:function(input){
			/*
			 *  This function validates the input and then sets the inString of this cipher object
			 *  which is a required input to the encrypt, and decrypt functions
			 *
			 *  Returns true if input is valid, or false if it is not.
			 */
			if(input&&(typeof "string"==typeof input)){
				this.inString=input;
				return true;
			} else {
				//console.log("setInString Failed!  No input detected!");
				return false;
			}
		},

		setPass:function(pass){
			/*
			 *  This function validates the input and then sets the passString of this cipher object
			 *  which is a required input to the encrypt and decrypt functions
			 *
			 *  Returns true if input is valid, or false if it is not.
			 */
			if(pass){
				if(typeof pass == typeof "test"){
					this.passString=pass;
					this.keyArray = this.key;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		testHex:function(index,test){
        	/*
        	 * This function returns true if the character of test
        	 * at the index is a base 16 number.  It returns false if the character is not a number.
        	 *
        	 */
        	var answer = false;
        	var answer = false;
        	if(index<test.length){
        		if(index>=0){
        			if(test.substring(index,index+1)=="0"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="1"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="2"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="3"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="4"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="5"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="6"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="7"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="8"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="9"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="a"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="b"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="c"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="d"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="e"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="f"){
        				answer = true;
        			}
        		}
        	}
        	return answer;
        },

        getIntFromHexString:function(hex){
        	/*
        	 * This function validates the input then returns the integer value of a string containing
        	 * a hex value.  Returns -1 if input is invalid.
        	 */
        	var answer = false;
        	if(!hex){
        		return -1;
        	}
        	if(typeof hex != typeof "test"){
        		return -1;
        	}
        	var length = hex.length;
        	var number = 0;
        	var product = 1;
        	for (var x = 0; x < length; x++) {
        		if(this.testHex(x,hex)){
        			if(hex.substring(length-x-1,length-x)=="a"){
        				number += 10*product;
        			} else if(hex.substring(length-x-1,length-x)=="b"){
        				number += 11*product;
        			} else if(hex.substring(length-x-1,length-x)=="c"){
        				number += 12*product;
        			} else if(hex.substring(length-x-1,length-x)=="d"){
        				number += 13*product;
        			} else if(hex.substring(length-x-1,length-x)=="e"){
        				number += 14*product;
        			} else if(hex.substring(length-x-1,length-x)=="f"){
        				number += 15*product;
        			} else if(this.testNumeric(length-x-1,hex)){
        				number += hex.substring(length-x-1,length-x)*product;
        			} else {
        				return -1;
        			}
        		} else {
        			return -1;
        		}
        		product = product*16;
        	}
        	//console.log(number);
        	return number;
        },

        testNumeric:function(index,test){
        	/*
        	 * This function returns true if the character of test
        	 * at the index is a number.  It returns false if the character is not a number.
        	 *
        	 */
        	var answer = false;
        	if(index<test.length){
        		if(index>=0){
        			if(test.substring(index,index+1)=="0"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="1"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="2"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="3"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="4"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="5"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="6"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="7"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="8"){
        				answer = true;
        			} else if(test.substring(index,index+1)=="9"){
        				answer = true;
        			}
        		}
        	}
        	return answer;
        },

		get key() {
			/*
			 *  This function attempts to calculate an encryption key
			 *  from this.passString and returns that key
			 *  or it returns false if this.passString is not valid.
			 */
			if(this.passString){
				if(typeof this.passString == typeof "string"){
					var passLength = this.passString.length;
					var keyShift = [];
					for(var x = 0;x < this.keyLength; x++){
						keyShift.push(0);
					}
					var paramA = this.newGear(13201,30000,19773);
					var paramB = this.newGear(219,500,87);
					var paramC = this.newGear(687,25000,109);
					var paramD = this.newGear(29,450,13);
					var paramE;
					var paramF;
					var paramG;
					if (this.keyLength>13){
						paramE = this.newGear(11,this.keyLength-1,2);
						paramF = this.newGear(7,this.keyLength-1,4);
						paramG = this.newGear(5,this.keyLength-1,6);
					} else if (this.keyLength>7){
						paramE = this.newGear(5,this.keyLength-1,2);
						paramF = this.newGear(3,this.keyLength-1,4);
						paramG = this.newGear(2,this.keyLength-1,6);
					} else if (this.keyLength>3){
						paramE = this.newGear(1,this.keyLength-1,0);
						paramF = this.newGear(2,this.keyLength-1,1);
						paramG = this.newGear(1,this.keyLength-1,1);
					} else {
						return false;
					}
					for(var x = 0;x < passLength; x++){
						for(var z = 0;z < this.keyLength; z++){
							keyShift[z] += Math.floor((paramA.next+paramC.next+(paramB.next+paramD.next)*x)/(this.passString.codePointAt(passLength-x-1)));
						}
						keyShift[paramE.next] += keyShift[paramF.next]+this.passString.codePointAt(x);
						keyShift[paramF.next] += keyShift[paramG.next]+this.passString.codePointAt(x);
						keyShift[paramG.next] += keyShift[paramE.next]+this.passString.codePointAt(x);
						keyShift[paramE.next] += keyShift[paramF.next]+this.passString.codePointAt(x);
						keyShift[paramF.next] += keyShift[paramG.next]+this.passString.codePointAt(x);
						keyShift[paramG.next] += keyShift[paramE.next]+this.passString.codePointAt(x);
						for(var id = 0; id<this.keyLength; id++){
							while(keyShift[id]>2560000){
								keyShift[id] = keyShift[id] - 2559999;
							}
						}
					}
					for(var id = 0; id<this.keyLength; id++){
						keyShift[id] = (keyShift[id] << 24) >>> 24;
					}
					this.keyArray = keyShift;
					return keyShift;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		get encryptHex(){
			/*
			 *  This function attempts to encrypt this.inString with a key generated from
			 *  this.passString.  It returns the encrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.keyArray;
					var inputLength = this.inString.length;
					var input = this.inString;
					var outShift = 0;
					var keyGears = [];
					for (var x = 0; x < Math.floor(this.keyLength/2); x++){
						keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(x+0.5*x)));
					}
					var gears = [];
					for (var x = 0; x < this.numGears; x++){
						var shift = Math.ceil(this.numGears*2.5);
						for(var y = 0; y < keyGears.length; y+=4){
							shift += keyShift[keyGears[y].next];
						}
						gears.push(this.newGear(x+1, shift, Math.floor(x+0.5*x)));
					}
					var x = 0;
					while(x < (inputLength-1)) {
						if(this.testHex(x,input)&&this.testHex(x+1,input)){
							outShift = 0;

							for(var y = 0; y < keyGears.length; y++){
								//console.log(keyShift[keyGears[y].next]);
								outShift += keyShift[keyGears[y].next];
							}
							for(var y = 0; y < gears.length; y++){
								//console.log(gears[y].next);
								outShift += gears[y].next;
							}
							//console.log(outShift);
							outShift += this.getIntFromHexString(input.substring(x,x+2));
							//console.log(outShift);

							outShift = (outShift << 24) >>> 24;

							//console.log(outShift);
							if(outShift.toString(16).length==1){
								output += "0" + outShift.toString(16);
							} else {
								output += outShift.toString(16);
							}
							x+=2;
						} else {
							x++;
						}
					}
				}
				//console.log(output);
				return output;
			}
			return false;
		},

		get decryptHex(){
			/*
			 *  This function attempts to decrypt this.inString with a key generated from
			 *  this.passString.  It returns the decrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.keyArray;
					var inputLength = this.inString.length;
					var input = this.inString;
					var outShift = 0;
					var keyGears = [];
					for (var x = 0; x < Math.floor(this.keyLength/2); x++){
						keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(x+0.5*x)));
					}
					var gears = [];
					for (var x = 0; x < this.numGears; x++){
						var shift = Math.ceil(this.numGears*2.5);
						for(var y = 0; y < keyGears.length; y+=4){
							shift += keyShift[keyGears[y].next];
						}
						gears.push(this.newGear(x+1, shift, Math.floor(x+0.5*x)));
					}
					var x = 0;
					while(x < (inputLength-1)){
						if(this.testHex(x,input)&&this.testHex(x+1,input)){
							outShift = 0;
							for(var y = 0; y < keyGears.length; y++){
								outShift += keyShift[keyGears[y].next];
							}
							for(var y = 0; y < gears.length; y++){
								outShift += gears[y].next;
							}

							outShift = 0 - outShift;

							outShift += this.getIntFromHexString(input.substring(x,x+2));

							outShift = (outShift << 24) >>> 24;

							//console.log(outShift);

							if(outShift.toString(16).length==1){
								output += "0" + outShift.toString(16);
							} else {
								output += outShift.toString(16);
							}

							x+=2;
						} else {
							//console.log(input.substring(x,x+2));
							output += "?";
							x++;

						}
					}
					return output;
				}
			}
			return false;
		},

		get encryptText(){
			/*
			 *  This function attempts to encrypt this.inString with a key generated from
			 *  this.passString.  It returns the encrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.keyArray;
					var inputLength = this.inString.length;
					var input = this.inString;
					var outShift = 0;
					var keyGears = [];
					for (var x = 0; x < Math.floor(this.keyLength/2); x++){
						keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(x+0.5*x)));
					}
					var gears = [];
					for (var x = 0; x < this.numGears; x++){
						var shift = Math.ceil(this.numGears*2.5);
						for(var y = 0; y < keyGears.length; y+=4){
							shift += keyShift[keyGears[y].next];
						}
						gears.push(this.newGear(x+1, shift, Math.floor(x+0.5*x)));
					}
					for(var x = 0;x < inputLength;x++){
						outShift = 0;
						for(var y = 0; y < keyGears.length; y++){
							outShift += keyShift[keyGears[y].next];
						}
						for(var y = 0; y < gears.length; y++){
							outShift += gears[y].next;
						}

						if(input.codePointAt(x)==10){
							outShift += 31;
						} else {
							outShift += input.codePointAt(x);
						}

						while(outShift>125){
							outShift = outShift - 126 + 31;
						}

						if(outShift==31){
							output += String.fromCharCode(10);
						} else {
							output += String.fromCharCode(outShift);
						}
					}
				}
				console.log(output);
				return output;
			}
			return false;
		},



		get decryptText(){
			/*
			 *  This function attempts to decrypt this.inString with a key generated from
			 *  this.passString.  It returns the decrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.keyArray;
					var inputLength = this.inString.length;
					var input = this.inString;
					var outShift = 0;
					var keyGears = [];
					for (var x = 0; x < Math.floor(this.keyLength/2); x++){
						keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(x+0.5*x)));
					}
					var gears = [];
					for (var x = 0; x < this.numGears; x++){
						var shift = Math.ceil(this.numGears*2.5);
						for(var y = 0; y < keyGears.length; y+=4){
							shift += keyShift[keyGears[y].next];
						}
						gears.push(this.newGear(x+1, shift, Math.floor(x+0.5*x)));
					}
					for(var x = 0;x < inputLength;x++){
						outShift = 0;
						for(var y = 0; y < keyGears.length; y++){
							outShift += keyShift[keyGears[y].next];
						}
						for(var y = 0; y < gears.length; y++){
							outShift += gears[y].next;
						}

						outShift = 0 - outShift;

						if(input.codePointAt(x)==10){
							outShift += 31;
						} else {
							outShift += input.codePointAt(x);
						}

						while(outShift<31){
							outShift = outShift + 126 - 31;
						}

						if(outShift==31){
							output += String.fromCharCode(10);
						} else {
							output += String.fromCharCode(outShift);
						}
					}
					return output;
				}
			}
			return false;
		},

		newGear:function newGear(length,range,startValue){
			let gear = {
				length:0,
				range:0,
				value:0,
				setProperties:function(length,range,startValue){
					if(range){
						if(length){

								if(range>0){
									if(length>0){
										if(startValue>=0){
											if(range>length){
												if(startValue<range){
													this.range = range;
													this.value = startValue;
													this.length = length;
													return true;
												} else {
													return false;
												}
											} else {
												return false;
											}
										} else {
											return false;
										}
									} else {
										return false;
									}
								} else {
									return false;
								}

						} else {
							return false;
						}
					} else {
						return false;
					}
				},
				get next() {
					if(this.range){
						if(this.length){

								if(this.range>0){
									if(this.length>0){
										if(this.value>=0){
											if(this.range>this.length){

													if((this.value+this.length)>this.range){
														this.value = this.value + this.length - this.range;
														return (this.value);
													} else {
														this.value = this.value + this.length;
														return (this.value);
													}

											} else {
												return false;
											}
										} else {
											return false;
										}
									} else {
										return false;
									}
								} else {
									return false;
								}

						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			};
			gear.setProperties(length,range,startValue);
			return gear;
		}

	};
	if(!cipher.setNumGears(numGears)){
		return false;
		//console.log("ClockCipher Initialization Failed!  numGears must be an integer greater than zero!");
	}
	if(!cipher.setKeyLength(keyLength)){
		return false;
		//console.log("ClockCipher Initialization Failed!  keyLength must be an integer greater than three!");
	}
	return cipher;
}

