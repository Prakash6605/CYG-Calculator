$(function(){
    console.log("jquery is running");

   // getting the content of the calculator
    function get_the_content_of_screen(){
        const infix = $("#cal_screen").val();

        console.log(infix);
        return infix;
    }

    function append_the_content(str){
        let present_infix_expr = get_the_content_of_screen();
        let final_infix_expr="";
        if(present_infix_expr!="")
           final_infix_expr = present_infix_expr +  str;
        else
           final_infix_expr = str;
        $("#cal_screen").val(final_infix_expr);    
    }

    // buttons events 
    $("#btn_one").on("click",function(){
        append_the_content('1');
    })
    $("#btn_two").on("click",function(){       
        append_the_content('2');
    })
    $("#btn_three").on("click",function(){   
        append_the_content('3');
    })
    $("#btn_four").on("click",function(){
        append_the_content('4');
    })
    $("#btn_five").on("click",function(){
        append_the_content('5');
    })
    $("#btn_six").on("click",function(){
        append_the_content('6');
    })
    $("#btn_seven").on("click",function(){
        append_the_content('7');
    })
    $("#btn_eight").on("click",function(){
        append_the_content('8');
    })
    $("#btn_nine").on("click",function(){
        append_the_content('9');
    })
    $("#btn_zero").on("click",function(){
        append_the_content('0');
    })
    $("#btn_plus").on("click",function(){
        append_the_content('+');
    })
    $("#btn_minus").on("click",function(){
        append_the_content('-');
    })
    $("#btn_mult").on("click",function(){
        append_the_content('*');
    })
    $("#btn_div").on("click",function(){
        append_the_content('/');
    })

    $("#btn_clr_src").on("click",function(){
        $("#cal_screen").val(""); 
    })


    // function for checking the precedence
    // this function return true if precedence of symbol1(infix[i]) is smaller or equal to precedence of symbol2(at top of stack)
    function precedence(symbol1,symbol2){
       if(symbol1=='+' || symbol1=='-')return true;
       else{
           if(symbol1=='/' &&  symbol2=='/')return true;
           if(symbol1='*' && (symbol2=='/' || symbol2=='*'))return true;
           return false;
       }
    }
    
    function operation(num1,num2,symbol){
        console.log(" num1 ",num1," num2 ",num2," symbol ", symbol);
        if(symbol=='+')return num1+num2;
        if(symbol=='-')return num1-num2;
        if(symbol=='*')return num1*num2;
        if(symbol=='/')return num1/num2;
    }

    // this function is for final evaluation
    function evaluate_the_infix_expression(infix){
       console.log(" The infix expression is " , infix);

       // creating the operator and operand  array they will acts as stack
       operator = [];
       operand = [];
       operator.push('#');

       for(let i=0;i<infix.length;i++){
           
           if(infix[i]=='+' || infix[i]=='-' || infix[i]=='*' || infix[i]=='/'){
            
            if(operator.length==1)operator.push(infix[i]);
            else{
                // we have to check for precedence and do some evaluation
                
                
                while(operator.length > 1 && precedence(infix[i],operator[operator.length-1])){
                    let num2 = operand.pop()-'0';
                    let num1 = operand.pop()-'0';
                    let symbol = operator.pop();
                    
                    result = operation(num1,num2,symbol);
                    
                    operand.push(result);
                }
                operator.push(infix[i]);
            }
           }
           else{
               let no="";
               while(i<infix.length && (infix[i]!='+' && infix[i]!='-' && infix[i]!='*' && infix[i]!='/')){
                   no = no + infix[i];
                   i++;
                   
               }
               
               operand.push(no);
               i--;
           }
       }

       // if some operators are there 
       while(operator.length>1){
           let num2 = operand.pop()-'0';
           let num1 = operand.pop()-'0';
           let symbol = operator.pop();

           result = operation(num1,num2,symbol);
           operand.push(result);
       }

       let final_ans = operand.pop();
       return final_ans;
    }
    $("#evaluate_btn").click(function(){
        

        const infix = get_the_content_of_screen();
        
        console.log("the content of the screen is " , infix);

        let result = evaluate_the_infix_expression(infix);

        console.log(" The final answer is " , result);

        $("#cal_screen").val(result);
    })
})