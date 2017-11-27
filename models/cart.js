module.exports = function GioHang(gio_hang_da_chon) {
    this.mat_hangs = gio_hang_da_chon.mat_hangs || {};
    this.totalQty = gio_hang_da_chon.totalQty || 0;
    this.totalPrice = gio_hang_da_chon.totalPrice || 0;

    this.add = function(mat_hang, id) {
        var storedItem = this.mat_hangs[id];
        if (!storedItem) {
            storedItem = this.mat_hangs[id] = {mat_hang: mat_hang, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.mat_hang.DonGiaBan * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.mat_hang.DonGiaBan;
    };

    this.reduceByOne = function(id) {
        this.mat_hangs[id].qty--;
        this.mat_hangs[id].price -= this.mat_hangs[id].mat_hang.price;
        this.totalQty--;
        this.totalPrice -= this.mat_hangs[id].mat_hang.price;

        if (this.mat_hangs[id].qty <= 0) {
            delete this.mat_hangs[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.mat_hangs[id].qty;
        this.totalPrice -= this.mat_hangs[id].price;
        delete this.mat_hangs[id];
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.mat_hangs) {
            arr.push(this.mat_hangs[id]);
        }
        return arr;
    };
};