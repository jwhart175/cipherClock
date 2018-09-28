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

function newClockCipher(keyLength,numGears){
	return {
		keyLength:keyLength,
		numGears:numGears,
		passString:"",
		inString:"",
		keyArray:[],

		setInString:function(input){
			/*
			 *  This function validates the input and then sets the inString of this mask
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
			 *  from this.passString and returns that key (an array of
			 *  20 integers) or it returns false if this.passString is not valid.
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
					if (keyLength>13){
						paramE = this.newGear(11,keyLength,2);
						paramF = this.newGear(7,keyLength,4);
						paramG = this.newGear(5,keyLength,6);
					} else if (keyLength>7){
						paramE = this.newGear(5,keyLength,2);
						paramF = this.newGear(3,keyLength,4);
						paramG = this.newGear(2,keyLength,6);
					} else if (keyLength>3){
						paramE = this.newGear(1,keyLength,0);
						paramF = this.newGear(2,keyLength,1);
						paramG = this.newGear(1,keyLength,1);
					} else if (keyLength==1){
						return false;
					}
					for(var x = 0;x < passLength; x++){
						for(var z = 0;z < keyLength; z++){
							keyShift[z] += Math.floor((paramA.next+paramC.next+(paramB.next+paramD.next)*y)/this.passString.codePointAt(passLength-x-1));
							keyShift[paramE.next] += keyShift[paramF.next]+this.passString.codePointAt(x)*1000;
							keyShift[paramF.next] += keyShift[paramG.next]+this.passString.codePointAt(x)*1000;
							keyShift[paramG.next] += keyShift[paramE.next]+this.passString.codePointAt(x)*1000;
						}

						for(var id = 0; id<keyLength; id++){
							while(keyShift[id]>2560000){
								keyShift[id] = keyShift[id] - 2560000;
							}
						}
					}
					for(var id = 0; id<keyLength; id++){
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
					var z = 0;
					var y = 0;
					var k = 0;
					var j = 0;
					var yShift = 0;
					var kShift = 0;
					var jShift = 0;
					for(var x = 0;x < keyShift.length;x++){
						if(keyShift[x]>(47+31)){
							yShift += x;
							kShift += 20-x;
							jShift += 13
						} else {
							yShift += 7;
							kShift += 11;
							jShift += x;
						}
					}
					for(var x = 0;x < inputLength;x++){
						y += yShift;
						k += kShift;
						j += jShift;
						if(y>1999){
							y -= 1999;
						}
						if(j>1999){
							j -= 1999;
						}
						if(k>1999){
							k -= 1999;
						}

						outShift = 0;
						outShift += y+j+k;

						switch(z) {
						case 0:
							outShift += keyShift[5]+keyShift[6]+keyShift[7]+keyShift[11]+keyShift[8]+keyShift[9];
							z++;
							break;
						case 1:
							outShift += keyShift[4]+keyShift[2]+keyShift[7]+keyShift[3]+keyShift[13]+keyShift[0];
							z++;
							break;
						case 2:
							outShift += keyShift[10]+keyShift[11]+keyShift[1]+keyShift[12]+keyShift[13]+keyShift[14];
							z++;
							break;
						case 3:
							outShift += keyShift[15]+keyShift[16]+keyShift[4]+keyShift[17]+keyShift[18]+keyShift[19];
							z++;
							break;
						case 4:
							outShift += keyShift[6]+keyShift[7]+keyShift[8]+keyShift[12]+keyShift[9]+keyShift[10];
							z++;
							break;
						case 5:
							outShift += keyShift[5]+keyShift[3]+keyShift[8]+keyShift[4]+keyShift[14]+keyShift[1];
							z++;
							break;
						case 6:
							outShift += keyShift[11]+keyShift[12]+keyShift[2]+keyShift[13]+keyShift[14]+keyShift[15];
							z++;
							break;
						case 7:
							outShift += keyShift[16]+keyShift[17]+keyShift[5]+keyShift[18]+keyShift[19]+keyShift[0];
							z++;
							break;
						case 8:
							outShift += keyShift[5]+keyShift[10]+keyShift[19]+keyShift[4]+keyShift[7]+keyShift[3];
							z++;
							break;
						case 9:
							outShift += keyShift[7]+keyShift[8]+keyShift[9]+keyShift[13]+keyShift[10]+keyShift[11];
							z++;
							break;
						case 10:
							outShift += keyShift[6]+keyShift[4]+keyShift[9]+keyShift[5]+keyShift[15]+keyShift[2];
							z++;
							break;
						case 11:
							outShift += keyShift[12]+keyShift[13]+keyShift[3]+keyShift[14]+keyShift[15]+keyShift[16];
							z++;
							break;
						case 12:
							outShift += keyShift[17]+keyShift[18]+keyShift[6]+keyShift[19]+keyShift[0]+keyShift[1];
							z++;
							break;
						case 13:
							outShift += keyShift[5]+keyShift[6]+keyShift[7]+keyShift[12]+keyShift[8]+keyShift[9];
							z++;
							break;
						case 14:
							outShift += keyShift[4]+keyShift[2]+keyShift[7]+keyShift[3]+keyShift[14]+keyShift[0];
							z++;
							break;
						case 15:
							outShift += keyShift[5]+keyShift[11]+keyShift[1]+keyShift[12]+keyShift[13]+keyShift[14];
							z++;
							break;
						case 16:
							outShift += keyShift[15]+keyShift[16]+keyShift[4]+keyShift[17]+keyShift[18]+keyShift[7];
							z++;
							break;
						case 17:
							outShift += keyShift[6]+keyShift[0]+keyShift[8]+keyShift[12]+keyShift[9]+keyShift[10];
							z++;
							break;
						case 18:
							outShift += keyShift[5]+keyShift[3]+keyShift[8]+keyShift[4]+keyShift[14]+keyShift[2];
							z++;
							break;
						case 19:
							outShift += keyShift[11]+keyShift[12]+keyShift[2]+keyShift[13]+keyShift[14]+keyShift[16];
							z++;
							break;
						case 20:
							outShift += keyShift[16]+keyShift[17]+keyShift[5]+keyShift[18]+keyShift[9]+keyShift[0];
							z++;
							break;
						case 21:
							outShift += keyShift[5]+keyShift[10]+keyShift[18]+keyShift[4]+keyShift[7]+keyShift[3];
							z++;
							break;
						case 22:
							outShift += keyShift[7]+keyShift[8]+keyShift[9]+keyShift[3]+keyShift[10]+keyShift[11];
							z++;
							break;
						case 23:
							outShift += keyShift[6]+keyShift[4]+keyShift[9]+keyShift[5]+keyShift[16]+keyShift[2];
							z++;
							break;
						case 24:
							outShift += keyShift[12]+keyShift[13]+keyShift[3]+keyShift[8]+keyShift[15]+keyShift[16];
							z++;
							break;
						case 25:
							outShift += keyShift[10]+keyShift[18]+keyShift[6]+keyShift[19]+keyShift[0]+keyShift[1];
							z++;
							break;
						case 26:
							outShift += keyShift[5]+keyShift[10]+keyShift[11]+keyShift[4]+keyShift[7]+keyShift[3];
							z = 0;
							break;
						default:
							z = 0;
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
					var z = 0;
					var y = 0;
					var k = 0;
					var j = 0;
					var yShift = 0;
					var kShift = 0;
					var jShift = 0;
					for(var x = 0;x < keyShift.length;x++){
						if(keyShift[x]>(47+31)){
							yShift += x;
							kShift += 20-x;
							jShift += 13
						} else {
							yShift += 7;
							kShift += 11;
							jShift += x;
						}
					}
					for(var x = 0;x < inputLength;x++){
						y += yShift;
						k += kShift;
						j += jShift;
						if(y>1999){
							y -= 1999;
						}
						if(j>1999){
							j -= 1999;
						}
						if(k>1999){
							k -= 1999;
						}

						outShift = 0;
						outShift += y+j+k;

						switch(z) {
						case 0:
							outShift += keyShift[5]+keyShift[6]+keyShift[7]+keyShift[11]+keyShift[8]+keyShift[9];
							z++;
							break;
						case 1:
							outShift += keyShift[4]+keyShift[2]+keyShift[7]+keyShift[3]+keyShift[13]+keyShift[0];
							z++;
							break;
						case 2:
							outShift += keyShift[10]+keyShift[11]+keyShift[1]+keyShift[12]+keyShift[13]+keyShift[14];
							z++;
							break;
						case 3:
							outShift += keyShift[15]+keyShift[16]+keyShift[4]+keyShift[17]+keyShift[18]+keyShift[19];
							z++;
							break;
						case 4:
							outShift += keyShift[6]+keyShift[7]+keyShift[8]+keyShift[12]+keyShift[9]+keyShift[10];
							z++;
							break;
						case 5:
							outShift += keyShift[5]+keyShift[3]+keyShift[8]+keyShift[4]+keyShift[14]+keyShift[1];
							z++;
							break;
						case 6:
							outShift += keyShift[11]+keyShift[12]+keyShift[2]+keyShift[13]+keyShift[14]+keyShift[15];
							z++;
							break;
						case 7:
							outShift += keyShift[16]+keyShift[17]+keyShift[5]+keyShift[18]+keyShift[19]+keyShift[0];
							z++;
							break;
						case 8:
							outShift += keyShift[5]+keyShift[10]+keyShift[19]+keyShift[4]+keyShift[7]+keyShift[3];
							z++;
							break;
						case 9:
							outShift += keyShift[7]+keyShift[8]+keyShift[9]+keyShift[13]+keyShift[10]+keyShift[11];
							z++;
							break;
						case 10:
							outShift += keyShift[6]+keyShift[4]+keyShift[9]+keyShift[5]+keyShift[15]+keyShift[2];
							z++;
							break;
						case 11:
							outShift += keyShift[12]+keyShift[13]+keyShift[3]+keyShift[14]+keyShift[15]+keyShift[16];
							z++;
							break;
						case 12:
							outShift += keyShift[17]+keyShift[18]+keyShift[6]+keyShift[19]+keyShift[0]+keyShift[1];
							z++;
							break;
						case 13:
							outShift += keyShift[5]+keyShift[6]+keyShift[7]+keyShift[12]+keyShift[8]+keyShift[9];
							z++;
							break;
						case 14:
							outShift += keyShift[4]+keyShift[2]+keyShift[7]+keyShift[3]+keyShift[14]+keyShift[0];
							z++;
							break;
						case 15:
							outShift += keyShift[5]+keyShift[11]+keyShift[1]+keyShift[12]+keyShift[13]+keyShift[14];
							z++;
							break;
						case 16:
							outShift += keyShift[15]+keyShift[16]+keyShift[4]+keyShift[17]+keyShift[18]+keyShift[7];
							z++;
							break;
						case 17:
							outShift += keyShift[6]+keyShift[0]+keyShift[8]+keyShift[12]+keyShift[9]+keyShift[10];
							z++;
							break;
						case 18:
							outShift += keyShift[5]+keyShift[3]+keyShift[8]+keyShift[4]+keyShift[14]+keyShift[2];
							z++;
							break;
						case 19:
							outShift += keyShift[11]+keyShift[12]+keyShift[2]+keyShift[13]+keyShift[14]+keyShift[16];
							z++;
							break;
						case 20:
							outShift += keyShift[16]+keyShift[17]+keyShift[5]+keyShift[18]+keyShift[9]+keyShift[0];
							z++;
							break;
						case 21:
							outShift += keyShift[5]+keyShift[10]+keyShift[18]+keyShift[4]+keyShift[7]+keyShift[3];
							z++;
							break;
						case 22:
							outShift += keyShift[7]+keyShift[8]+keyShift[9]+keyShift[3]+keyShift[10]+keyShift[11];
							z++;
							break;
						case 23:
							outShift += keyShift[6]+keyShift[4]+keyShift[9]+keyShift[5]+keyShift[16]+keyShift[2];
							z++;
							break;
						case 24:
							outShift += keyShift[12]+keyShift[13]+keyShift[3]+keyShift[8]+keyShift[15]+keyShift[16];
							z++;
							break;
						case 25:
							outShift += keyShift[10]+keyShift[18]+keyShift[6]+keyShift[19]+keyShift[0]+keyShift[1];
							z++;
							break;
						case 26:
							outShift += keyShift[5]+keyShift[10]+keyShift[11]+keyShift[4]+keyShift[7]+keyShift[3];
							z = 0;
							break;
						default:
							z = 0;
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
			return {
				length:length,
				range:range,
				value:startValue,
				get next() {
					if(this.range){
						if(this.length){
							if(this.value){
								if(this.range>0){
									if(this.length>0){
										if(this.value>0){
											if(this.range>this.length){
												if(this.value<this.range){
													if(this.value+this.length<this.range){
														this.value = this.value + this.length;
														return (this.value);
													} else {
														this.value = this.value + this.length - this.range
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
						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			};
		}

	};

}

