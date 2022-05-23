var SUPP_SUCCESS = "#s_success_message";
var SUPP_FAIL = "#s_alert_message";

$(document).ready(function () {
    $("#supplierTbl").DataTable({
        "searching": false,
        "info": false,
    });
    $(".supplier-search").selectpicker();
});

$(".supplier-search").change(function (e) {
    var tbl = $("#supplierTbl").DataTable();
    let url = ''
    if ($(this).val() === 'None')
        url = '/supplier-all'
    else {
        let id = $(this).attr('id');
        switch (id) {
            case 'supplierName':
                url = '/supp-filter/'
                break;
            case 'sgroupSelect':
                url = '/supp-filter-sg/'
                break;
        }
        url = url + $(this).val();
    }
    if (url === '') return;
    $.ajax({
        type: 'GET',
        url: url,
        data: $(this).val(),
        contentType: false,
        processData: false,
        success: function (data) {
            tbl.rows('tr').remove();
            var suppliers = data.suppliers;
            if (suppliers.length > 0) {
                for (let i = 0; i < suppliers.length; i++) {
                    var supplier = suppliers[i];
                    tbl.row.add([
                        `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input">
                            </div>
                            `,
                        `
                            <a href='javascript:onclick=openSupplierInfo(${supplier.id});'>${supplier.company_name}</a>
                            `,
                        supplier.contact_name,
                        supplier.phone_number,
                        supplier.supplier_address,
                        supplier.sg_materials_count.toString()
                    ]);
                }
            }
            tbl.draw();
        }
    });
    e.preventDefault();

});

$("#deleteSuppForm").submit(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        }
    });
    $.ajax({
        type: "DELETE",
        url: $(this).attr('action'),
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            loadSupplier();
        }
    });
    return false;
});

$("#deleteSupplier").click(function () {
    $("#deleteSuppForm").submit();
});

$("#saveBtn, #updateSupplierBtn").click(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        }
    });
    
    if (
        !$("#supplier_name").val() || !$("#supplier_phone").val() ||
        !$("#supplier_email").val() || !$("#supplier_address").val()
        ) {
            slideAlert("Please make sure that all the appropriate information has been provided.", SUPP_FAIL);
            return;
        }

        let number = $("#supplier_phone").val(); 

        if(number.match(/^[0-9]+$/) == null || number.substring(0,2).match('09') == null) {
            slideAlert("Invalid format detected for contact number.", SUPP_FAIL);
            return;
        }
        
        if (number.length != 11) {
            slideAlert("Contact number is not of appropriate length.", SUPP_FAIL);
            return;
        }
    
    var formData = new FormData();
    formData.append('supplier_name', $("#supplier_name").val());
    formData.append('supplier_phone', $("#supplier_phone").val());
    formData.append('supplier_email', $("#supplier_email").val());
    if ($("#supplier_contact").val()) {
        formData.append('supplier_contact', $("#supplier_contact").val());
    }
    formData.append('supplier_address', $("#supplier_address").val());

    var route = $("#hiddenSuppField").val() ? `/update-supplier/${$("#hiddenSuppField").val()}` : '/supplier';

    $.ajax({
        url: route,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            loadSupplier();
        }
    });

    return false;
});
