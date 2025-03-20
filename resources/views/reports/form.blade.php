<html lang="en">
<head>
    <title>{{ $form->name }} Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
 
</head>
<body>

<div style="padding : 30px">

    <div class="mt-5 text-gray-900" style="display: grid; place-items: center; text-align: center;">
            <h3 style="max-width: 600px;margin-bottom : 0px;">
               {{ $form->name }} Report
            </h3>
            <small style="color: grey;"> ({{$form->alias }} / {{ $form->code }})</small>
    </div>
    <div class="mb-10">
            <small class="mt-2"> Date Generated  :  <span style="color: grey;">{{ $date }}</span></small>
    </div>
         
    <div class="mb-2 mt-5" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Report Details </small>
    </div>
  
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Name</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->name }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Alias</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->alias }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Code</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->code }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Effective From</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->effective_from }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Effective To</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->effective_to }}</small></td>
            </tr>
            <tr>
                <th class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Status</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{$form->status }}</small></td>
            </tr>
   
        </tbody>
    </table>



    <div class="mb-2 mt-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Acknowledgement Details  </small>
    </div>
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
             <tr >
                <th  style="background-color: '#FAFAFA' !important;" class=" w-1/2 py-2 text-gray-700 border border-gray-100">
                    <span class="ml-2"><small>Total</small></span>
                </th>
                <td class="w-1/2 py-2 text-gray-700 border border-gray-100">
                    <small class="ml-2">10</small>
                </td>
            <tr>
                <th style="background-color: '#FAFAFA' !important;"  class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Pending / Uncompleted</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">5</small></td>
            </tr>
            <tr>
                <th style="background-color: '#FAFAFA' !important;" class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Completed</small></span></th>
                <td class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">5</small></td>
            </tr>
            <tr>
                <th style="background-color: '#FAFAFA' !important;" class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Submission (%)</small></span></th>
                <td class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">50</small></td>
            </tr>
        </tbody>
    </table>


    <div class="mb-2 mt-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Issuance Details  </small>
    </div>
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
             <tr>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Company</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Issued </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Deadline </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Pending</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Completed</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Submission (%)</small></th>
            </tr>
            <tr>
                <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>PNMS</small></span></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">11 Jan 2025</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">31 Jan 2025</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">10</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">5</small></td>
                <td class="py-2 text-gray-700 border  border-gray-100"><small class="ml-2">50</small></td>
            </tr>
            <tr>
                <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>PNMS</small></span></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">11 Jan 2025</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">31 Jan 2025</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">10</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">5</small></td>
                <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">50</small></td>
            </tr>
        </tbody>
    </table>



 </div>
  
</body>
</html>