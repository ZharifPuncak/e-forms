

<div style="padding-left : 30px;padding-right : 30px;">

         
    <div class="mb-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Report Details </small>
    </div>
  
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Name</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['name'] }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Alias</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['alias'] }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Code</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['code'] }}</small></td>
            </tr>
            <tr>
                <th class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Category</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['category'] }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Effective From</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['effective_from'] }}</small></td>
            </tr>
            <tr>
                <th class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Effective To</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['effective_to'] }}</small></td>
            </tr>
            <tr>
                <th class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Status</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['status']}}</small></td>
            </tr>
            <tr>
                <th class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Remarks</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['remarks']}}</small></td>
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
                    <small class="ml-2">{{ $formattedForm['total']}}</small>
                </td>
            <tr>
                <th style="background-color: '#FAFAFA' !important;"  class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Pending / Uncompleted</small></span></th>
                <td class="w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['pending']}}</small></td>
            </tr>
            <tr>
                <th style="background-color: '#FAFAFA' !important;" class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Completed</small></span></th>
                <td class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['completed']}}</small></td>
            </tr>
            <tr>
                <th style="background-color: '#FAFAFA' !important;" class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Submission (%)</small></span></th>
                <td class=" w-1/2 py-2 py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $formattedForm['submission']}}</small></td>
            </tr>
        </tbody>
    </table>


    
    @if($formattedForm['issuance'])
    <div class="mb-2 mt-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Issuance Details  </small>
    </div>
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
             <tr>
             <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>No</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Company</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Issued </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Deadline </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Total</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Pending</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Completed</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Submission (%)</small></th>
            </tr>
            @foreach($formattedForm['issuance'] as $item)
                <?php

                    $data = json_encode($item);
                    $data = json_decode($data, true);

                    ?>
                <tr>
                <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>{{ $loop->iteration }}</small></span></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>{{ $data['company'] }}</small></span></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $data['issued'] }}</small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $data['deadline'] }}</small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $data['total'] }}</small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">{{ $data['pending'] }}</small></td>
                    <td class="py-2 text-gray-700 border  border-gray-100"><small class="ml-2">{{ $data['completed'] }}</small></td>
                    <td class="py-2 text-gray-700 border  border-gray-100"><small class="ml-2">{{ $data['submission'] }}</small></td>
                </tr>
            @endforeach
       
        </tbody>
    </table>
    @endif

 
 </div>
  
