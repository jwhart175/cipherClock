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

function newCipher(keyLength,numGears){
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
					var keyShift = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
					var y = 0;
					for(var x = 0;x < passLength; x++){
						keyShift[y] += this.passString.codePointAt(x)+1;
						keyShift[19-y] += this.passString.codePointAt(x)+y;
						keyShift[0] += Math.floor((20000+500*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[1] += Math.floor((19000+200*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[2] += Math.floor((21000+300*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[3] += Math.floor((25000+700*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[4] += Math.floor((8000+1100*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[5] += Math.floor((32000+290*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[6] += Math.floor((9000+250*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[7] += Math.floor((3000+2000*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[8] += Math.floor((1000+3000*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[9] += Math.floor((900+6700*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[10] += Math.floor((522+3100*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[11] += Math.floor((10000+750*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[12] += Math.floor((15000+350*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[13] += Math.floor((12500+975*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[14] += Math.floor((42000+220*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[15] += Math.floor((500+9300*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[16] += Math.floor((18700+672*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[17] += Math.floor((73000+42*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[18] += Math.floor((35600+870*y)/this.passString.codePointAt(passLength-x-1));
						keyShift[19] += Math.floor((5500+1240*y)/this.passString.codePointAt(passLength-x-1));
						switch(y) {
						case 0:
							keyShift[0] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 1:
							keyShift[1] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 2:
							keyShift[2] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 3:
							keyShift[3] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 4:
							keyShift[4] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 5:
							keyShift[5] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 6:
							keyShift[6] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 7:
							keyShift[7] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 8:
							keyShift[8] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 9:
							keyShift[9] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 10:
							keyShift[9] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 11:
							keyShift[10] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 12:
							keyShift[11] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 13:
							keyShift[12] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 14:
							keyShift[13] += keyShift[17]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 15:
							keyShift[14] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 16:
							keyShift[15] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							keyShift[17] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[4]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[1]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 17:
							keyShift[16] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							keyShift[18] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[0] += this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[3] += this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[6] += this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[7]+this.passString.codePointAt(x)*1000;
							keyShift[9] += this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[15]+this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[12] += this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[15] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 18:
							keyShift[17] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[18] += this.passString.codePointAt(x)*1000;
							keyShift[19] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[8]+this.passString.codePointAt(x)*1000;
							keyShift[1] += this.passString.codePointAt(x)*1000;
							keyShift[2] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[2]+this.passString.codePointAt(x)*1000;
							keyShift[4] += this.passString.codePointAt(x)*1000;
							keyShift[5] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[19]+this.passString.codePointAt(x)*1000;
							keyShift[7] += this.passString.codePointAt(x)*1000;
							keyShift[8] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[10]+this.passString.codePointAt(x)*1000;
							keyShift[10] += this.passString.codePointAt(x)*1000;
							keyShift[11] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[12]+this.passString.codePointAt(x)*1000;
							keyShift[13] += this.passString.codePointAt(x)*1000;
							keyShift[14] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[16] += this.passString.codePointAt(x)*1000;
							y++;
							break;
						case 19:
							keyShift[18] += keyShift[6]+this.passString.codePointAt(x)*1000;
							keyShift[19] += this.passString.codePointAt(x)*1000;
							keyShift[0] += keyShift[18]+this.passString.codePointAt(x)*1000;
							keyShift[1] += keyShift[9]+this.passString.codePointAt(x)*1000;
							keyShift[2] += this.passString.codePointAt(x)*1000;
							keyShift[3] += keyShift[16]+this.passString.codePointAt(x)*1000;
							keyShift[4] += keyShift[3]+this.passString.codePointAt(x)*1000;
							keyShift[5] += this.passString.codePointAt(x)*1000;
							keyShift[6] += keyShift[14]+this.passString.codePointAt(x)*1000;
							keyShift[7] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[8] += this.passString.codePointAt(x)*1000;
							keyShift[9] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[10] += keyShift[11]+this.passString.codePointAt(x)*1000;
							keyShift[11] += this.passString.codePointAt(x)*1000;
							keyShift[12] += keyShift[0]+this.passString.codePointAt(x)*1000;
							keyShift[13] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[14] += this.passString.codePointAt(x)*1000;
							keyShift[15] += keyShift[5]+this.passString.codePointAt(x)*1000;
							keyShift[16] += keyShift[13]+this.passString.codePointAt(x)*1000;
							keyShift[17] += this.passString.codePointAt(x)*1000;
							y=0;
							break;
						default:
							y=0;
						}
						for(var id = 0; id<20; id++){
							while(keyShift[id]>1250000){
								keyShift[id] = keyShift[id] - 1260000 + 310000;
							}
						}
					}
					for(var id = 0; id<20; id++){
						while(keyShift[id]>125){
							if(keyShift[id]>1250000){
								keyShift[id] = keyShift[id] - 1260000 + 310000;
							} else if(keyShift[id]>125000){
								keyShift[id] = keyShift[id] - 126000 + 31000;
							} else if(keyShift[id]>12500){
								keyShift[id] = keyShift[id] - 12600 + 3100;
							} else if(keyShift[id]>1250){
								keyShift[id] = keyShift[id] - 1260 + 310;
							} else {
								keyShift[id] = keyShift[id] - 126 + 31;
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
		}

	}

}

