export default {
  data: () => ({
    person: {
      prefix: '',
      firstname: '',
      lastname: '',
      photo: '',
      birthday: '',
      email: '',
      tel: '',
      gender: '',
      status: '',
      blood: '',
      religion: '',
      address: {
        address: '',
        tambon: '',
        amphoe: '',
        province: '',
        postcode: ''
      },
      education: [
        { school: '', level: '', faculty: '' }
      ],
      occupation: [
        { job: '', organization: '', position: '', salary: 0 }
      ],
      social: [
        { account: '', host: '' }
      ],
      closeRelation: [
        { person: '', relation: '' }
      ]
    }
  })
}
