

<div style="padding : 30px; margin-top : 100px;">


    <div class="mb-2 mt-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Acknowledgement List  </small>
    </div>
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
             <tr>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>No</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>Name</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Company </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Department </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Position </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Status</small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-2">Submitted</small></th>
            </tr>

            @foreach($formattedForm['acknowledgements'] as $item)
                <tr>
                   <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>{{ $loop->iteration }}</small></span></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-2"><small>{{ $item->name }}</small></span></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2"></small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2"></small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2"></small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2"></small></td>
                    <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-2"></small></td>
                </tr>
            @endforeach
           
        </tbody>
    </table>
 </div>
  
