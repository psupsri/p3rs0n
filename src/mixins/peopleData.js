export default {
  data: () => ({
    people: {
      firstname: '',
      lastname: '',
      birthday: '',
      email: '',
      tel: '',
      gender: '',
      status: '',
      blood: '',
      religion: '',
      address: {
        address: '',
        subDistrict: '',
        district: '',
        province: '',
        zipcode: ''
      },
      schools: [
        { school: '', level: '', faculty: '', year: '' }
      ],
      organizationsPrimary: { job: '', organization: '', position: '', salary: 0 },
      organizations: [
        { job: '', organization: '', position: '', salary: 0 }
      ],
      socials: [
        { account: '', host: '' }
      ],
      photo: ''
    }
  })
}
