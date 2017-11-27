var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    TenSP:{
        type:String,
        validate: {
                validator: function(v){
                return /^[0-9 aáàạảãăắằặẳẵâấầậẩẫbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyAÁÀẠẢÃĂẮẰẶẲẴÂẤẦẬẨẪBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXY]+$/.test(v) && v.length > 1 && v.length < 100
                },
                message: 'tên chỉ chứa ký tự (a-z) và số (0-9) và chiều dài lợp lệ là 2-100 ký tự!'
        }      
    },
    SoLuong:{type:Number, require:true,
            validate: {
                    validator: function(v){
                    return  v>0
                    },
                    message: 'Số lượng phải lớn hơn 0!'
            }
    },
    DonGiaBan:{type:Number, require:true,
            validate: {
                    validator: function(v){
                    return  v>0
                    },
                    message: 'Số lượng phải lớn hơn 0!'
            }
    },
    MoTa:{type:String},
    Hinh:{type:String},
    ChuThich:{type:String}
});

module.exports = mongoose.model('Product', productSchema);