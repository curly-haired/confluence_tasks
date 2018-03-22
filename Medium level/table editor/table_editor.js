var AdminForm = {
        init() {
            // Table fields
            this.productTitle = document.getElementById('pTitle');
            this.productPrice = document.getElementById('pPrice');
            this.productAvailability = document.getElementById('pAvailability');
            this.addToTable = document.getElementById('addToTable');

            this.importDataTextField = document.getElementById('exportedData');
            this.tableAddRowGroup = document.getElementById('addRowGroup');
            this.tableImportDataGroup = document.getElementById('importDataGroup');

            // Table properties
            this.productTable = document.getElementById('products-list');
            this.id = 0;
            this.sortIncrease = true;

            // Buttons to edit table
            this.sortIdBtn = document.getElementById('sortID');
            this.sortNameBtn = document.getElementById('sortName');
            this.sortQtyBtn = document.getElementById('sortQty');

            this.deleteRow = document.getElementById('deleteRow');
            this.clearTable = document.getElementById('clearTable');
            this.demoData = document.getElementById('demoData');
            this.exportTable = document.getElementById('exportTable');
            this.importTable = document.getElementById('importData');

            // Pagination properties
            this.currentPage = 1;
            this.pages = 1;
            this.rowsForPage = 5;
            this.row_quantity = document.getElementById('row_quantity');
            this.pagination = document.getElementById('pagination');
            this.prev = document.getElementById('prev');
            this.next = document.getElementById('next');
            this.page_current = document.getElementById('page_current');
            this.page_last = document.getElementById('page_last');
            
            this.event();
        },

        event() {
            this.addToTable.addEventListener('click', this.handleSubmit.bind(this));
            this.deleteRow.addEventListener('click', this.handleDeleteRow.bind(this));
            this.clearTable.addEventListener('click', this.handleClearTable.bind(this));
            this.demoData.addEventListener('click', this.handleDemoData.bind(this));
            this.exportTable.addEventListener('click', this.handleExportData.bind(this));
            this.importTable.addEventListener('click', this.handleImportData.bind(this));
            this.sortIdBtn.addEventListener('click', this.handleSort.bind(this, this.sortIdBtn));
            this.sortNameBtn.addEventListener('click', this.handleSort.bind(this, this.sortNameBtn));
            this.sortQtyBtn.addEventListener('click', this.handleSort.bind(this, this.sortQtyBtn));
            this.prev.addEventListener('click', this.handlePaginationClick.bind(this, this.prev));
            this.next.addEventListener('click', this.handlePaginationClick.bind(this, this.next));
            this.page_last.addEventListener('click', this.handlePaginationClick.bind(this, this.page_last));
            this.row_quantity.addEventListener('change', this.handleChangePagination.bind(this));
        },

        addRowToTable() {
            if (this.formValidation()) {
                this.createNewProduct();
                this.insertToTable();
                this.showPagination();
            } 
        },

        formValidation() {  
            if(this.productTitle.value.length < 1 || this.productPrice.value.length < 1 ||  !this.productPrice) {
                alert('Please, fill in the form');
                return false;
            } else {
                return true;
            }
        },

        createNewProduct() {
            // object to operate and store data
            this.product = {
                title: this.productTitle.value,
                price: this.productPrice.value, 
                availability: this.productAvailability.checked ? 'in stock' : 'out of stock'
            };
        },

        insertToTable() {
            var row = this.productTable.insertRow();

            // row 
            row.id = this.id++;
            var i = 1;
            row.insertCell(0).innerHTML = +row.id;

            for(key in this.product) {
                row.insertCell(i).innerHTML = this.product[key];
                i++;
            }
            row.insertCell(this.product.length).innerHTML =  '<input type="checkbox" class="checkboxItem" id="' + 'checkbox_' + this.id + '" />' ;
        },

        handleChangePagination() {
            this.rowsForPage = +this.row_quantity.value;
            if (this.rowsForPage > this.productTable.rows.length) {
                this.rowsForPage = this.productTable.rows.length;
            }          
            this.updatePagination();
            this.page_last.innerHTML = this.pages;
        },

        handlePaginationClick(btn, e) {
            e.preventDefault();

            switch (btn.id) {
                case 'prev':
                    if (this.currentPage == 1) {
                        return;
                    } else {
                        if (this.rowsForPage > this.productTable.rows.length) {
                            for (var i = 0; i < this.productTable.rows.length; i++) {
                                this.productTable.rows[i].style.display = 'table-row';
                            }
                            return;
                        }
                            for (var i = 0; i < this.productTable.rows.length; i++) {
                                this.productTable.rows[i].style.display = 'none';
                            }
                            this.currentPage--;
                            var buf = this.currentPage * this.rowsForPage;
                            for (var i = 0; i < this.rowsForPage; i++) {
    
                            if (buf > 0) {
                                buf--
                                this.productTable.rows[buf].style.display = 'table-row';
                            }
                        }
                    }
                    this.page_current.innerHTML = this.currentPage;
                    break;

                case 'next':
                    if (this.currentPage == this.pages) {
                            return;
                        } else {
                                for (var i = 0; i < this.productTable.rows.length; i++) {
                                    this.productTable.rows[i].style.display = 'none';
                                }

                                var buf = this.currentPage * this.rowsForPage;
                                for (var i = 0; i < this.rowsForPage; i++) {
                                    
                                if (this.productTable.rows.length > (buf)) {
                                    
                                    this.productTable.rows[buf].style.display = 'table-row';
                                    buf++
                                }
                            }
                        this.currentPage++;
                    }
                    this.page_current.innerHTML = this.currentPage;
                    break;

                case 'page_last':
                    this.currentPage = this.pages - 1;
                    var event = new Event("click");
                    this.next.dispatchEvent(event);
                    this.page_current.innerHTML = this.currentPage;
                    break;
            }
        },

        showPagination() {
            if (this.productTable.rows.length >= 1) {
                this.pagination.style.display = 'block';
                this.row_quantity.style.display = 'block';
                this.updatePagination();
                this.currentPage = this.currentPage + 1;
                var event = new Event("click");
                this.prev.dispatchEvent(event);
                this.page_last.innerHTML = this.pages;
            } else {
                this.row_quantity.style.display = 'none';
                this.pagination.style.display = 'none';
            }
        },

        updatePagination() {
            if (this.productTable.rows.length > this.rowsForPage) {
                this.pages = Math.ceil(this.productTable.rows.length / this.rowsForPage);
            } else {
                this.pages = 1;
            }
            this.currentPage = 2;

            var event = new Event("click");
            this.prev.dispatchEvent(event);
        },

        handleDeleteRow() {
            for (var i = 0; i < this.productTable.rows.length; i++) {
                if (document.getElementsByClassName('checkboxItem')[i].checked) {
                    this.changeIndex(i);
                    this.productTable.deleteRow(i);
                    i--;
                }
                this.showPagination();
            }
        },

        changeIndex(index) {
            if (this.sortIncrease && index !== this.productTable.rows.length - 1){
                for (var k = index; k < this.productTable.rows.length; k++) {
                    this.productTable.rows[k].id = this.productTable.rows[k].id -1;
                    document.getElementsByClassName('checkboxItem')[k].id = 'checkbox_' + (this.productTable.rows[k].id);
                    this.productTable.rows[k].cells[0].innerHTML = +(this.productTable.rows[k].cells[0].innerHTML) - 1;
                }
            }
            this.id--;
        },

        handleClearTable() {
            for (var i = 0; i < this.productTable.rows.length; i++) {
                this.productTable.deleteRow(i);
                this.changeIndex(i);
                i--;
            }
            this.showPagination();
        },

        handleSubmit(e) {
            e.preventDefault();
            this.addRowToTable();
            this.clearFields();
        },

        clearFields() {
            this.productTitle.value = '';
            this.productAvailability.checked = false;
            this.importDataTextField.innerHTML = ''
        },

        handleDemoData() {
            this.createNewProduct();
            var randRowQuantity = Math.floor(Math.random() * 10) + 1;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < randRowQuantity; i++) {
                for (var j = 0; j < 10; j++){
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                };
                var randProductQuantity = Math.floor(Math.random() * 1000) + 1;
                this.product.title = text;
                this.product.price = randProductQuantity;
                this.product.availability = Math.random() < 0.5 ? 'in stock' : 'out of stock';
                text = "";

                this.insertToTable();
            }
            this.showPagination();
            this.handleChangePagination();
        },

        handleExportData() {
            var dataExportArray = {};
            var key;
            var value;
            for (var i = 0; i < this.productTable.rows.length; i++) {
                var rowArrData = [];
                for (var j = 0; j < this.productTable.rows[i].cells.length-1; j++) {
                    key = this.productTable.rows[i].id;
                    value = this.productTable.rows[i].cells[j].innerHTML;
                    rowArrData.push(value); 
                    dataExportArray['' + key + ''] = rowArrData;
                    
                } 
            }
            this.tableAddRowGroup.style.display = 'none';
            this.importDataTextField.innerHTML = JSON.stringify(dataExportArray);
            this.tableImportDataGroup.style.display = 'block'; 
        },

        handleImportData() {
            var dataToImport = JSON.parse(this.importDataTextField.innerHTML);
            
            for (var key in dataToImport) {
                var row = this.productTable.insertRow();
                row.id = this.id++;
                row.insertCell(0).innerHTML = +row.id + 1;
                var arr = dataToImport[key];
                for (var j = 1; j < arr.length; j++) {
                    row.insertCell(j).innerHTML = arr[j];
                }
                row.insertCell(arr.length).innerHTML = '<input type="checkbox" class="checkboxItem" id="' + 'checkbox_' + this.id + '" />'
            } 
            this.clearFields();
            this.tableAddRowGroup.style.display = 'block';
            this.tableImportDataGroup.style.display = 'none'; 
        },

        handleSort(buttonElement) {
            var insertBefore,
                    parentEl,
                    insertedEl,
                    sortingCell,
                    currentDataCell,
                    nextDataCell,
                    rows = this.productTable.rows;

            switch (buttonElement) {
                case this.sortIdBtn:
                sortingCell = 0;
                break;

                case this.sortNameBtn:
                sortingCell = 1;
                break;

                case this.sortQtyBtn:
                sortingCell = 2;
                break;
            }

            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows.length - i - 1; j++) {
                    if(sortingCell !== 1) {
                        currentDataCell = +(rows[j].cells[sortingCell].innerHTML);
                        nextDataCell = +(rows[j + 1].cells[sortingCell].innerHTML);
                    } else {
                        currentDataCell = rows[j].cells[sortingCell].innerHTML;
                        nextDataCell = rows[j + 1].cells[sortingCell].innerHTML;
                    }
                    if (this.sortIncrease) {
                        if(nextDataCell > currentDataCell) {
                            insertBefore = rows[j];
                            insertedEl = rows[j + 1];
                            parentEl = rows[j].parentNode;
                            parentEl.insertBefore(insertedEl, insertBefore);
                        }
                    } else {
                        if(nextDataCell < currentDataCell) {
                            insertBefore = rows[j];
                            insertedEl = rows[j + 1];
                            parentEl = rows[j].parentNode;
                            parentEl.insertBefore(insertedEl, insertBefore);
                        }
                    } 
                }
            }
        this.sortIncrease = !this.sortIncrease;
    }, 
};
AdminForm.init();