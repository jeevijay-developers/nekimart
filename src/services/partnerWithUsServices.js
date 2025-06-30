import requests from "./httpServices";

const PartnerWithUs = {
  register: async (data) => {
    return await requests.post("/partnerwithus/register", data);
  }
};

export default PartnerWithUs;
