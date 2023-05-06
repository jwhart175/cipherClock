function newCipherClock(keyLength,numGears){
    let cipher = {
        keyLength:0,
        numGears:0,
        passString:"",
        inString:"",
        keyArray:[],
        tickGears:false,
        lowerCaseArray:["aa","ab","ac","ad","ae","af","ag","ah","ai","aj","ak","al","am","an","ao","ap","ba","bb","bc","bd","be","bf","bg","bh","bi","bj","bk","bl","bm","bn","bo","bp","ca","cb","cc","cd","ce","cf","cg","ch","ci","cj","ck","cl","cm","cn","co","cp","da","db","dc","dd","de","df","dg","dh","di","dj","dk","dl","dm","dn","do","dp","ea","eb","ec","ed","ee","ef","eg","eh","ei","ej","ek","el","em","en","eo","ep","fa","fb","fc","fd","fe","ff","fg","fh","fi","fj","fk","fl","fm","fn","fo","fp","ga","gb","gc","gd","ge","gf","gg","gh","gi","gj","gk","gl","gm","gn","go","gp","ha","hb","hc","hd","he","hf","hg","hh","hi","hj","hk","hl","hm","hn","ho","hp","ia","ib","ic","id","ie","if","ig","ih","ii","ij","ik","il","im","in","io","ip","ja","jb","jc","jd","je","jf","jg","jh","ji","jj","jk","jl","jm","jn","jo","jp","ka","kb","kc","kd","ke","kf","kg","kh","ki","kj","kk","kl","km","kn","ko","kp","la","lb","lc","ld","le","lf","lg","lh","li","lj","lk","ll","lm","ln","lo","lp","ma","mb","mc","md","me","mf","mg","mh","mi","mj","mk","ml","mm","mn","mo","mp","na","nb","nc","nd","ne","nf","ng","nh","ni","nj","nk","nl","nm","nn","no","np","oa","ob","oc","od","oe","of","og","oh","oi","oj","ok","ol","om","on","oo","op","pa","pb","pc","pd","pe","pf","pg","ph","pi","pj","pk","pl","pm","pn","po","pp"],


        get tick() {
            if(this.keyLength){
                if(this.keyArray){
                    if(this.tickGears){
                        this.keyArray[this.tickGears[0].next] += 5 + this.keyArray[this.tickGears[1].next];
                        this.keyArray[this.tickGears[0].next] += 3 + this.keyArray[this.tickGears[2].next];
                        this.keyArray[this.tickGears[0].next] += 2 + this.keyArray[this.tickGears[3].next];
                        this.keyArray[this.tickGears[0].next] += 1 + this.keyArray[this.tickGears[4].next];
                        this.keyArray[this.tickGears[1].next] += this.tickGears[2].next;
                        this.keyArray[this.tickGears[2].next] += 1 + this.keyArray[this.tickGears[3].next];
                        this.keyArray[this.tickGears[3].next] += this.tickGears[4].next;
                        this.keyArray[this.tickGears[4].next] += 3 + this.keyArray[this.tickGears[1].next];
                        this.keyArray[this.tickGears[0].next] += 5 + this.keyArray[this.tickGears[1].next];
                        this.keyArray[this.tickGears[1].next] += this.tickGears[2].next;
                        this.keyArray[this.tickGears[2].next] += 1 + this.keyArray[this.tickGears[3].next];
                        this.keyArray[this.tickGears[3].next] += this.tickGears[4].next;
                        this.keyArray[this.tickGears[4].next] += 3 + this.keyArray[this.tickGears[1].next];
                        for(var x = 0; x < this.keyLength; x++){
                            this.keyArray[x] = (this.keyArray[x]&255);
                        }
                    } else {
                        var A;
                        var B;
                        var C;
                        var D;
                        var E;
                        if (this.keyLength>13){
                            A = this.newGear(1,this.keyLength-1,0);
                            B = this.newGear(7,this.keyLength-1,4);
                            C = this.newGear(5,this.keyLength-1,6);
                            D = this.newGear(3,this.keyLength-1,3);
                            E = this.newGear(11,this.keyLength-1,5);
                        } else if (this.keyLength>7){
                            A = this.newGear(1,this.keyLength-1,0);
                            B = this.newGear(3,this.keyLength-1,4);
                            C = this.newGear(5,this.keyLength-1,6);
                            D = this.newGear(4,this.keyLength-1,3);
                            E = this.newGear(6,this.keyLength-1,5);
                        } else if (this.keyLength>3){
                            A = this.newGear(1,this.keyLength-1,0);
                            B = this.newGear(2,this.keyLength-1,1);
                            C = this.newGear(1,this.keyLength-1,1);
                            D = this.newGear(3,this.keyLength-1,0);
                            E = this.newGear(2,this.keyLength-1,3);
                        } else {
                            //console.log("Tick failed! There is no key!");
                            return false;
                        }
                        this.tickGears = [A,B,C,D,E];
                        this.keyArray[this.tickGears[0].next] += 5 + this.keyArray[this.tickGears[1].next];
                        this.keyArray[this.tickGears[1].next] += this.tickGears[2].next;
                        this.keyArray[this.tickGears[2].next] += 1 + this.keyArray[this.tickGears[3].next];
                        this.keyArray[this.tickGears[3].next] += this.tickGears[4].next;
                        this.keyArray[this.tickGears[4].next] += 3 + this.keyArray[this.tickGears[0].next];
                        this.keyArray[this.tickGears[0].next] += 5 + this.keyArray[this.tickGears[1].next];
                        this.keyArray[this.tickGears[1].next] += this.tickGears[2].next;
                        this.keyArray[this.tickGears[2].next] += 1 + this.keyArray[this.tickGears[3].next];
                        this.keyArray[this.tickGears[3].next] += this.tickGears[4].next;
                        this.keyArray[this.tickGears[4].next] += 3 + this.keyArray[this.tickGears[0].next];
                        for(var x = 0; x < this.keyLength; x++){
                            this.keyArray[x] = (this.keyArray[x]&255);
                        }
                    }
                    return true;
                } else {
                    //console.log("Tick failed! There is no key!");
                    return false;
                }
            } else {
                //console.log("Tick failed! There is no key!");
                return false;
            }
        },

        get testClock() {
            var input = "000102030405060708090a0b0c0d0e     \n\n\n   0f1012131415161718191a1b1c1d1e1f000102";
            var hexinput = "000102030405060708090a0b0c0d0e0f1012131415161718191a1b1c1d1e1f000102";
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
            this.setInString(hexinput);
            this.setInString(this.encryptHex);
            output = this.decryptHex;
            if(hexinput === output){
                console.log("Hex encryption Successful!");
            } else {
                console.log("Hex encryption Failed!");
                console.log("input: " + input);
                console.log("output: " + output);
            }
            this.setInString(input);
            this.setInString(this.encryptLowerCase);
            output = this.decryptLowerCase;
            if(input === output){
                console.log("lowerCase encryption Successful!");
            } else {
                console.log("lowerCase encryption Failed!");
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
                if(input>20){
                    this.numGears=input;
                    return true;
                } else {
                    //console.log("setNumGears Failed!  input must be greater than twenty!");
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
                if(input>20){
                    this.keyLength=input;
                    return true;
                } else {
                    //console.log("setKeyLength Failed!  input must be greater than twenty!");
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
                        keyShift[id] = (keyShift[id]&255);
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
                    var input = "";
                    var seed = 0;
                    for (var n = 0; n < 10; n++){
						seed = Math.floor(Math.random()*95+31);                
                        if(seed==31){
                            input += String.fromCharCode(10);
                        } else {
                            input += String.fromCharCode(seed);
                        }
                    }
                    input = input + this.inString;
                    var inputLength = input.length;
                    var outShift = 0;
                    var keyGears = [];
                    for (var x = 0; x < Math.floor(this.keyLength/2); x++){
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    var x = 0;
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    while(x < (inputLength)) {
                        outShift = 0;
                        for(var y = 0; y < keyGears.length; y++){
                            outShift += keyShift[keyGears[y].next];
                        }
                        if(memshift%2==0){
                            for(var y = 0; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        } else {
                            for(var y = 1; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        }
                        outShift += memshift;
                        outShift += input.codePointAt(x);
                        if(memshift%3==0){
                            z = ((outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                        } else {
                            z = ((outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                        }
                        memshift = 0;
                        for (var y = 0; y < z; y++){
                            memshift += keyShift[keyGears[y].next];
                        }
                        outShift = (outShift&255);
                        if(outShift.toString(16).length==1){
                            output += "0" + outShift.toString(16);
                        } else {
                            output += outShift.toString(16);
                        }
                        x++;
                    }
                    return output;
                }
            }
            return false;
        },

        getLowerCaseFromInt:function(test){
            if(test < 256 || test >= 0){
                return this.lowerCaseArray[test];
            } else {
                //console.log("Cannot convert " + test + " to lowerCase!");
                return false;
            }
        },

        getIntFromLowerCase:function(test){
            for(var x = 0; x < 256;x++){
                if(test === this.lowerCaseArray[x]){
                    return x;
                }
            }
            //console.log("Cannot convert " + test + " to an integer!");
            return false;
        },

        get encryptLowerCase(){
            /*
             *  This function attempts to encrypt this.inString with a key generated from
             *  this.passString.  It returns the encrypted string or false if either
             *  this.inString or this.passString is valid.
             */
            var output = "";
            if(this.inString&&this.passString){
                if(typeof this.inString == typeof "test" && typeof this.passString == typeof "test"){
                    var keyShift = this.keyArray;
                    var input = "";
                    var seed = 0;
                    for (var n = 0; n < 10; n++){
						seed = Math.floor(Math.random()*95+31);                    
                        if(seed==31){
                            input += String.fromCharCode(10);
                        } else {
                            input += String.fromCharCode(seed);
                        }
                    }
                    input = input + this.inString;
                    var inputLength = input.length;
                    var outShift = 0;
                    var keyGears = [];
                    for (var x = 0; x < Math.floor(this.keyLength/2); x++){
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    var x = 0;
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    while(x < (inputLength)) {
                        outShift = 0;
                        for(var y = 0; y < keyGears.length; y++){
                            outShift += keyShift[keyGears[y].next];
                        }
                        if(memshift%2==0){
                            for(var y = 0; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        } else {
                            for(var y = 1; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        }
                        outShift += memshift;
                        outShift += input.codePointAt(x);
                        if(memshift%3==0){
                            z = ((outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                        } else {
                            z = ((outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                        }
                        memshift = 0;
                        for (var y = 0; y < z; y++){
                            memshift += keyShift[keyGears[y].next];
                        }
                        outShift = (outShift&255);
                        output += this.getLowerCaseFromInt(outShift);
                        x++;
                    }
                }
                return output;
            }
            return false;
        },

        get decryptLowerCase(){
            /*
             *  This function attempts to decrypt this.inString with a key generated from
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
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    var x = 2;
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    while(x < (inputLength+1)) {
                        outShift = 0;
                        for(var y = 0; y < keyGears.length; y++){
                            outShift += keyShift[keyGears[y].next];
                        }
                        if(memshift%2==0){
                            for(var y = 0; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        } else {
                            for(var y = 1; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        }
                        outShift += memshift;
                        out = 0 - outShift;
                        out += this.getIntFromLowerCase(input.substring(x-2,x));
                        out = (out&255);
                        if(memshift%3==0){
                            z = ((out+outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                        } else {
                            z = ((out+outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                        }
                        memshift = 0;
                        for (var y = 0; y < z; y++){
                            memshift += keyShift[keyGears[y].next];
                        }
                        output += String.fromCharCode(out);
                        x+=2;
                    }
                }
                if(output.length>10){
                  	return output.substring(10,output.length);
                } else {
					return false;
				}
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
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    var x = 0;
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    while(x < (inputLength-1)){
                        	outShift = 0;
                            for(var y = 0; y < keyGears.length; y++){
                                outShift += keyShift[keyGears[y].next];
                            }
                            if(memshift%2==0){
                                for(var y = 0; y < gears.length; y+=2){
                                    outShift += gears[y].next;
                                }
                            } else {
                                for(var y = 1; y < gears.length; y+=2){
                                    outShift += gears[y].next;
                                }
                            }
                            outShift += memshift;
                            out = 0 - outShift;
                            out += this.getIntFromHexString(input.substring(x,x+2));
                            out = (out&255);
                            if(memshift%3==0){
                                z = ((out+outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                            } else {
                                z = ((out+outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                            }
                            memshift = 0;
                            for (var y = 0; y < z; y++){
                                memshift += keyShift[keyGears[y].next];
                            }
                            output += String.fromCharCode(out);
                            x+=2;
                    }
                    if(output.length>10){
                    	return output.substring(10,output.length);
                    } else {
						return false;
					}
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
                    var input = "";
                    var seed = 0;
                    for (var n = 0; n < 10; n++){
						seed = Math.floor(Math.random()*95+31);                    
                        if(seed==31){
                            input += String.fromCharCode(10);
                        } else {
                            input += String.fromCharCode(seed);
                        }
                    }
                    input = input + this.inString;
                    var inputLength = input.length;
                    var outShift = 0;
                    var keyGears = [];
                    for (var x = 0; x < Math.floor(this.keyLength/2); x++){
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    for(var x = 0;x < inputLength;x++){
                        outShift = 0;
                        for(var y = 0; y < keyGears.length; y++){
                            outShift += keyShift[keyGears[y].next];
                        }
                        if(memshift%2==0){
                            for(var y = 0; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        } else {
                            for(var y = 1; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        }
                        outShift += memshift;
                        if(input.codePointAt(x)==10){
                            outShift += 31;
                        } else {
                            outShift += input.codePointAt(x);
                        }
                        while(outShift>125){
                            outShift = outShift - 126 + 31;
                        }
                        if(memshift%3==0){
                            z = ((outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                        } else {
                            z = ((outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                        }
                        memshift = 0;
                        for (var y = 0; y < z; y++){
                            memshift += keyShift[keyGears[y].next];
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
                        keyGears.push(this.newGear(x+1, this.keyLength-1, Math.floor(1+x+0.5*x)));
                    }
                    var gears = [];
                    for (var x = 0; x < this.numGears; x++){
                        var shift = Math.ceil(this.numGears*2.5);
                        for(var y = 0; y < keyGears.length; y+=4){
                            shift += keyShift[keyGears[y].next];
                        }
                        while(shift<Math.floor(1+x+0.5*x)){
                            shift += keyShift[keyGears[Math.floor(this.keyLength/2)-1].next];
                        }
                        gears.push(this.newGear(x+1, shift, Math.floor(1+x+0.5*x)));
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    val = 0;
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    preshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    for (var z = 0; z < preshift; z++){
                        for (var x = 0; x < this.numGears; x++){
                            val += (gears[x].next&0);
                            for(var y = 0; y < keyGears.length; y++){
                                val += (keyGears[y].next&0);
                            }
                        }
                    }
                    memshift = Math.floor((keyShift[keyGears[Math.floor(this.keyLength/2)-1].next]+keyGears[Math.floor(this.keyLength/2)-1].next)/2);
                    for(var x = 0;x < inputLength;x++){
                        outShift = 0;
                        for(var y = 0; y < keyGears.length; y++){
                            outShift += keyShift[keyGears[y].next];
                        }
                        if(memshift%2==0){
                            for(var y = 0; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        } else {
                            for(var y = 1; y < gears.length; y+=2){
                                outShift += gears[y].next;
                            }
                        }
                        outShift += memshift;
                        out = 0 - outShift;
                        if(input.codePointAt(x)==10){
                            out += 31;
                        } else {
                            out += input.codePointAt(x);
                        }
                        if(memshift%3==0){
                            z = ((out+outShift+keyGears[9].next+keyGears[8].next+keyGears[7].next)&15)+4;
                        } else {
                            z = ((out+outShift+keyGears[6].next+keyGears[5].next+keyGears[4].next)&15)+4;
                        }
                        memshift = 0;
                        for (var y = 0; y < z; y++){
                            memshift += keyShift[keyGears[y].next];
                        }
                        while(out<31){
                            out = out + 126 - 31;
                        }
                        if(out==31){
                            output += String.fromCharCode(10);
                        } else {
                            output += String.fromCharCode(out);
                        }
                    }
                    if(output.length>10){
                    	return output.substring(10,output.length);
                    } else {
						return false;
					}
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
                                                    this.range = range;
                                                    this.value = 0;
                                                    this.length = length;
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
                                                    if((this.value+this.length)>=this.range){
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