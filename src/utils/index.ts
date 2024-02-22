import { RefObject } from "react";
import { ELang } from "@/common/enum";
import { SelectOptions } from "@/components/Control/type";
import { ApiQuery } from "@/services/type";

const utils = {
  uuid: () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x100000)
        .toString(16)
        .substring(1);
    return `${s4()}-${s4()}-${s4()}/${s4()}-${s4()}-${s4()}`;
  },

  collapse: (ref: RefObject<any>) => {
    if (!ref.current) return;
    if (ref.current === null) return;

    const node = ref.current;
    if (node.style.maxHeight) node.style.maxHeight = "";
    else node.style.maxHeight = `${node.scrollHeight}px`;
  },

  formatClassName: (...classNames: string[]) => {
    return classNames.filter((name) => name).join(" ");
  },

  formatPrice: (locale: ELang, price = 0) => {
    const displayPrice = price.toLocaleString();
    const currency = locale === ELang.VN ? "đ" : "VND";
    return `${displayPrice} ${currency}`;
  },

  formatPhoneNumber: (phone: string) => {
    let telFormat = "(xxx) xxxx xxxx";
    let mobileFormat = "(xxx) xxx xxxx";
    const telNumberLength = 11;
    const mobileNumberLength = 10;

    if (phone.length !== telNumberLength && phone.length !== mobileNumberLength)
      return "Invalid phone number";

    for (let i = 0; i < phone.length; i++) {
      telFormat = telFormat.replace("x", phone[i]);
      mobileFormat = mobileFormat.replace("x", phone[i]);
    }

    if (phone.length === telNumberLength) return telFormat;
    return mobileFormat;
  },

  formatQuery: (query: ApiQuery) => {
    let apiQuery = {};
    for (let [key, value] of Object.entries(query)) {
      if (Boolean(value)) apiQuery = { ...apiQuery, [key]: value };
    }
    return apiQuery;
  },

  getNameCurrentUrl: () => {
    if (!window) return "";
    const { pathname } = window.location;
    const name = pathname.split("/")[1];
    return name ? name : "dashboard";
  },

  mapDataToOptions: <M extends object>(list: M[], label: keyof M, value: keyof M) => {
    if (!list.length) return [];
    const options: SelectOptions = list.map((item) => ({ label: item[label], value: item[value] }));
    return options;
  },
};

export default utils;
