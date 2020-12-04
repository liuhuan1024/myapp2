export const getUserLogin = () => {
  const userInfo = {
    error_code: 0,
    data: [
      {
        id: '1',
        username: 'admin',
        password: '123456',
        token: '12345'
      },
      {
        id: '2',
        username: 'liuhuan',
        password: 'root',
        token: '23456'
      }
    ]
  }
  return userInfo
}

export const getUserInfo = () => {
  const userInfo = {
    data: [
      {
        id: '1',
        username: 'admin',
        photo: 'p.jpg',
        art_count: '21',
        follow_count: '13',
        fans_count: '301',
        like_count: '129',
        token: '12345'
      },
      {
        id: '2',
        username: '昀希安',
        photo: 'liuhuan.jpg',
        art_count: '11',
        follow_count: '19',
        fans_count: '213',
        like_count: '215',
        token: '23456'
      }
    ]
  }
  return userInfo
}
