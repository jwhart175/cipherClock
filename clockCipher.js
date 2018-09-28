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
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
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
						var a1 = paramE.next;var a2 = paramF.next;var a3 = paramG.next;
						keyShift[a1] += keyShift[a2]+this.passString.codePointAt(x)*1000;
						a1 = paramE.next;a2 = paramF.next;a3 = paramG.next;
						keyShift[a2] += keyShift[a3]+this.passString.codePointAt(x)*1000;
						a1 = paramE.next;a2 = paramF.next;a3 = paramG.next;
						keyShift[a3] += keyShift[a1]+this.passString.codePointAt(x)*1000;
						a1 = paramE.next;a2 = paramF.next;a3 = paramG.next;
						keyShift[a1] += keyShift[a2]+this.passString.codePointAt(x)*1000;
						a1 = paramE.next;a2 = paramF.next;a3 = paramG.next;
						keyShift[a2] += keyShift[a3]+this.passString.codePointAt(x)*1000;
						a1 = paramE.next;a2 = paramF.next;a3 = paramG.next;
						keyShift[a3] += keyShift[a1]+this.passString.codePointAt(x)*1000;
						for(var id = 0; id<this.keyLength; id++){
							while(keyShift[id]>2560000){
								keyShift[id] = keyShift[id] - 2560000;
							}
						}
					}
					for(var id = 0; id<this.keyLength; id++){
						while(keyShift[id]>255){
							if(keyShift[id]>2550000){
								keyShift[id] = keyShift[id] - 2560000;
							} else if(keyShift[id]>255000){
								keyShift[id] = keyShift[id] - 256000;
							} else if(keyShift[id]>25500){
								keyShift[id] = keyShift[id] - 25600;
							} else if(keyShift[id]>2550){
								keyShift[id] = keyShift[id] - 2560;
							} else {
								keyShift[id] = keyShift[id] - 256;
							}
						}
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

		get encrypt(){
			/*
			 *  This function attempts to encrypt this.inString with a key generated from
			 *  this.passString.  It returns the encrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.key;
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
						for(var y = 0; y < keyGears.length; y+=2){
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

						if(outShift>125){
							while(outShift>125){
								outShift = outShift - 126 + 31;
							}
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



		get decrypt(){
			/*
			 *  This function attempts to decrypt this.inString with a key generated from
			 *  this.passString.  It returns the decrypted string or false if either
			 *  this.inString or this.passString is valid.
			 */
			var output = "";
			if(this.inString&&this.passString){
				if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
					var keyShift = this.key;
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
						for(var y = 0; y < keyGears.length; y+=2){
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

						if(outShift<31){
							while(outShift<31){
								outShift = outShift + 126 - 31;
							}
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
			console.log(gear.setProperties(length,range,startValue));
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

