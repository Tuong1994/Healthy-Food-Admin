const common_vn = {
  company: "Công ty TNHH HEATHY FOOD",
  menu: {
    dashboard: "Dashboard",
    customer: "Khách hàng",
    product: "Sản phẩm",
    order: "Đơn hàng",
    shipment: "Vận chuyển",
    category: "Danh mục",
    subcategory: "Danh mục phụ",
  },
  form: {
    label: {
      account: "Tài khoản",
      password: "Mật khẩu",
      oldPassword: "Mật khẩu cũ",
      newPassword: "Mật khẩu mới",
      firstName: "Tên",
      lastName: "Họ",
      fullName: "Họ và Tên",
      phone: "Điện thoại",
      email: "Email",
      gender: "Giới tính",
      birthday: "Ngày sinh",
      role: "Vai trò",
      fullAddress: "Địa chỉ",
      addressEn: "Địa chỉ (EN)",
      addressVn: "Địa chỉ (VN)",
      productNameEn: "Tên sản phẩm (EN)",
      productNameVn: "Tên sản phẩm (VN)",
      city: "Thành phố/Tỉnh",
      district: "Quận/Huyện",
      ward: "Phường/Xã",
      note: "Ghi chú",
      unit: "Đơn vị",
      status: "Trạng thái",
      origin: "Xuất xứ",
      inventory: "Hàng tồn kho",
      inventoryStatus: "Tình trạng tồn kho",
      cost: "Giá gốc",
      profit: "Lợi nhuận",
      price: "Tổng giá",
      category: "Danh mục",
      subCategory: "Danh mục phụ",
      supplier: "Nhà cung cấp",
      paymentStatus: "Tình trạng thanh toán",
      paymentMethod: "Phương thức thanh toán",
      recievedType: "Phương thức nhận hàng",
      customer: "Khách hàng",
      orderNumber: "Số đơn hàng",
      categoryNameEn: "Tên danh mục (EN)",
      categoryNameVn: "Tên danh mục (VN)",
      subCategoryNameEn: "Tên danh mục phụ (EN)",
      subCategoryNameVn: "Tên danh mục phụ (VN)",
      optional: "Không bắt buộc",
    },
    placeholder: {
      enter: "Nhập thông tin",
      select: "Chọn",
      search: "Tìm kiếm",
      imagesUpload: "Chọn hoặc kéo thả hình ảnh vào khu vực này",
      filesUpload: "Chọn tập tin",
      sortBy: "Sắp Xếp",
    },
    rule: {
      required: "Trường này là bắt buộc",
      phone: "Điện thoại không hợp lệ",
      email: "Email không hợp lệ",
      whiteSpace: "Không được có khoảng trắng",
      min: "{{min}} là tối thiểu",
      max: "{{max}} là tối đa",
      minLength: "Phải có ít nhất {{min}} ký tự",
      maxLength: "Độ dài tối đa là {{max}} ký tự",
    },
    others: {
      emptyOptions: "Không có lựa chọn",
      optional: "Không bắt buộc",
      fileSize: "Kích thước tệp không được lớn hơn {{num}}MB",
      fileType: "Chỉ chấp nhận loại tệp {{type}}",
      fileMax: "Mỗi lần chỉ có thể tải lên {{num}} hình ảnh",
    },
  },
  unit: {
    quanity: "sl",
    day: "ngày",
    month: "tháng",
    year: "năm",
  },
  status: {
    inStock: "Còn hàng",
    outOfStock: "Hết hàng",
    new: "Mới",
  },
  actions: {
    ok: "Ok",
    filter: "Lọc",
    save: "Lưu",
    create: "Tạo mới",
    edit: "Chỉnh sửa",
    update: "Cập nhật",
    remove: "Xóa",
    cancel: "Hủy",
    export: "Export excel",
  },
  table: {
    head: {
      name: "Tên",
      customerName: "Họ và Tên",
      phone: "Điện thoại",
      email: "Email",
      gender: "Giới tính",
      birthday: "Ngày sinh",
      address: "Địa chỉ",
      role: "Vai trò",
      image: "Hình ảnh",
      productName: "Tên sản phẩm",
      quantity: "Số lượng",
      price: "Đơn giá",
      orderNumber: "Mã đơn hàng",
      status: "Trạng thái",
      paymentStatus: "Tình trạng thanh toán",
      paymentMethod: "Phương thức thanh toán",
      recievedType: "Phương thức nhận hàng",
      unit: "Đơn vị",
      origin: "Xuất xứ",
      inventory: "Hàng tồn kho",
      inventoryStatus: "Tình trạng tồn kho",
      supplier: "Nhà cung cấp",
      comment: "Bình luận",
      rate: "Đánh giá",
      shipmentNumber: "Mã vận chuyển",
      createdAt: "Ngày tạo",
      updatedAt: "Ngày cập nhật",
    },
  },
  description: {
    remove: "Bạn có muốn xóa {{num}} dòng đã chọn không ?",
    noData:
      "Đã xảy ra lỗi. Có vẻ như đang gặp khó khăn khi lấy dữ liệu. Vui lòng thử lại hoặc liên hệ với nhóm hỗ trợ của chúng tôi",
    empty: "Không có dữ liệu",
  },
  message: {
    success: {
      create: "Tạo thành công",
      update: "Cập nhật thành công",
      remove: "Xóa thành công",
    },
    error: {
      create: "Lỗi! Không thể tạo",
      update: "Lỗi! Không thể cập nhật",
      remove: "Lỗi! Không thể xóa",
    },
  },
};

export default common_vn;
