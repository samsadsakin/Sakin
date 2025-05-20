

function BtnAdd()
{
    /*Add Button*/
    var v = $("#TRow").clone().appendTo("#TBody") ;
   /* $(v).find("input" ).val('');*/
    $(v).removeClass("d-none");
    $(v).find("th").first().html($('#TBody tr').length - 1);

    
    
}



function BtnDel(v)
{
    /*Delete Button*/
       $(v).parent().parent().remove(); 
       GetTotal();

        $("#TBody").find("tr").each(
        function(index)
        {
           $(this).find("th").first().html(index);
        }

       );
}

function Calc(v)
{
    /*Detail Calculation Each Row*/
    var index = $(v).parent().parent().index();
    
    var qty = document.getElementsByName("qty")[index].value;
    var rate = document.getElementsByName("rate")[index].value;
    var discount=document.getElementsByName("discount")[index].value;
    var  percent=1/100;
    var char= qty * rate * discount * percent;
    var amt= (qty * rate) - char;
    document.getElementsByName("amt")[index].value = amt;

    GetTotal();
}

function GetTotal()
{
    /*Footer Calculation*/  
    var sum=0;
    var amts =  document.getElementsByName("amt");

    for (let index = 0; index < amts.length; index++)
    {
        var amt = amts[index].value;
        sum = +(sum) +  +(amt) ; 
    }

    document.getElementById("FTotal").value = sum;

    var due =  document.getElementById("due").value;
    var gst =  document.getElementById("fGST").value;
    var net = +(sum) - +(due) - +(gst) ;
    document.getElementById("fNet").value = net;
}
function SetCurrentDate()
	{
		const date = new Date();
		console.log(date);

		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();

		if (d < 10) d = '0' + d;
		if (m < 10) m = '0' + m;

		let CurrDate = y + '-' + m + '-' + d;

		 $('input[name="inv_dt"]').val(CurrDate); 
		
	} 
    $(document).ready(function () {
        SetCurrentDate();
        MaxInv();
        FillDataList();
     
       

        
        
    
    });


function MaxInv()
{
        $.getJSON("https://script.google.com/macros/s/AKfycby7acPEOAgjA9Hfit_XF2xShJ1SuI_-OVf0xC1T5rMxDcdWEFYEu0Yq_Dn4Jltc63FIRw/exec?page=max", 
        function (data) {
            
             $('input[name="invno"]').val(data);
	     $('input[name="seller_nm"]').val(1);
             
             
        })
}
function FillDataList()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbwL3ptd--SI0kHyfBbsJdueISfGv8ssox8dNuvcbiNXm0vnSxJuES5MBJrm0YGY6V7f/exec?page=dropdown", 
        function (data) {                              //01
          var Options="";                              
          $.each(data, function(key, value)            //02
          {
            Options = Options + '<option>' + value + '</option>';   //03
          });
          $("#mylist").append(Options);               //04
        });
}
function GetRate(v) { //01
    var index = $(v).parent().parent().index();  //02
    var Item = $(v).val(); //03
    $.getJSON("https://script.google.com/macros/s/AKfycbxrcIpoHHZ5qNBJChIjXClq9pKLjYCNQvjhUa_OJzPYLO5HNiQIhrhtfWqa11kjoYftaA/exec?page=getrate&no="+Item,
    function (data) { //04
    if (data > 0) {
    document.getElementsByName("rate")[index].value = data;	//05
    Calc(v); //06
    }
    });
}





       
    
      
    
