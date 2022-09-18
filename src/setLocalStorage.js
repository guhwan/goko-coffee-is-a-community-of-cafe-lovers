function setRecentView(data) {
  // 로컬스토리지에 recent 라는 key가 없다면
  if (!localStorage.getItem('recent')) {
    // data 객체를 배열에 담은뒤 JSON 문자열로 바꿔서 recent라는 키의 값으로 세팅해준다.
    localStorage.setItem('recent', JSON.stringify([data]));
  } else {
    // recent가 이미 있다면 recent 키의 값을 가져온 뒤 JSON 객체(배열)로 바꿔준다.
    let tempArr = JSON.parse(localStorage.getItem('recent'));

    // 기존의 recent에 지금 넣고자 하는 data 객체와 같은 내용이 없다면(즉, 처음 넣는 데이터라면)
    if (tempArr.every(item => item.pk !== data.pk)) {
      // 배열의 맨 앞에 data 객체를 넣어준다.
      tempArr.unshift(data);
      // data 객체를 집어넣은 배열 객체를 JSON 문자열로 변환해서 recent 키를 다시 설정해준다.
      localStorage.setItem('recent', JSON.stringify(tempArr));
    } else if (
      // recent 키값에 지금 넣고자 하는 data 객체와 같은게 하나라도 있다면(즉, 중복되는 값이 이미 로컬스토리지에 있다면)
      tempArr.some(item => item.pk === data.pk)
    ) {
      // 로컬스토리지의 배열 객체의 각각의 객체를 입력하고자하는 data 객체와 비교하면서 같은 부분의 인덱스를 찾는다.
      const sameIdx = tempArr.findIndex(item => item.pk === data.pk);
      // 같은 부분의 인덱스를 제거한다.
      tempArr.splice(sameIdx, 1);
      // data 객체를 배열의 맨 앞에 넣어준다.(즉, 기존의 것이 맨 위로 이동하는 것처럼 보인다.)
      tempArr.unshift(data);
      // 배열 객체를 JSON 문자열로 변환해서 recent 키를 다시 설정해준다.
      localStorage.setItem('recent', JSON.stringify(tempArr));
    }
  }
}

export { setRecentView };
