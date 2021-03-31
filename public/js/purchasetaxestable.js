
function addRow(){
    if($('#no-data')[0]){
        deleteItemRow($('#no-data').parents('tr'));
    }
    let lastRow = $('#purchasetaxes-table tr:last');
    let nextID = (lastRow.length != 0) ? lastRow.data('id') + 1 : 0;
    $('#purchasetaxes-table').append(
    `<tr data-id="${nextID}">
    <td id="mr-code-input-${nextID}" class="mr-code-input"> <input type="text" name="Tax_type" class="form-control"></td>
    <td id="mr-code-input-${nextID}" class="mr-code-input"> <input type="text" name="account_head" class="form-control"></td>
    <td id="mr-code-input-${nextID}" class="mr-code-input"> <input placeholder="12" type="number" name="Rate" class="form-control"></td>
    <td id="mr-code-input-${nextID}" class="mr-code-input"> <input placeholder="P 0.00" type="number" name="Tax_Amount" class="form-control"></td>
    <td id="mr-code-input-${nextID}" class="mr-code-input"> <input placeholder="P 0.00" type="number" name="Tax_Total" class="form-control"></td>    
    <td>
        <a id="" class="btn delete-btn" href="#" role="button">
            <i class="fa fa-minus" aria-hidden="true"></i>
        </a>
    </td>
    </tr>`);
}