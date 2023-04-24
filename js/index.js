const splitChar = '→';
let roomHostOrder = 0;
let winCounter = 0;

// 入力完了ボタンを押下した時の処理
const pushOrderFinishBtn = function() {
    const inputOrder = $('.room-order').val();
    const orderArray = inputOrder.split(splitChar);

    const outputOrder = linefeedManager(orderArray);
    if($('.now-order').length > 0) {
        $('.now-order').empty();
        $('.close-edit-btn').remove();
        $('.edit-btn').remove();
        closeEditArea();
        winCounter = 0;
        $('.win-counter').text(winCounter);
    }
    $('.now-order').html(outputOrder);

    resultManager(orderArray);
    
    // 編集エリアを表示するボタンを生成
    $('.edit-area').prepend('<button class="close-edit-btn" disabled>編集エリアを閉じる</button>');
    $('.edit-area').prepend('<button class="edit-btn">編集エリアを開く</button>');
    
    $('.edit-btn').click(function (){
        openEditArea();
    });

    $('.close-edit-btn').click(function (){
        closeEditArea();
    });

    $('.winner').text(orderArray[0]);
    $('.win-counter-keeper').val(winCounter);
}

// 1Pwinボタンを押下した時の処理
const winner1P = function() {
    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 2Pを末尾に移動させる
    const target = nowOrderArray[1];
    nowOrderArray.splice(1,1);
    nowOrderArray.push(target);
    
    //const nextOrder = nowOrderArray.join(splitChar);
    const nextOrder = linefeedManager(nowOrderArray);
    $('.now-order').html(nextOrder);


    // 1Pが勝った場合、連勝数は＋１
    winCounter += 1;
    $('.win-counter').text(winCounter);
    $('.winner').text(nowOrderArray[0]);
    
    resultManager(nowOrderArray);

    // 編集エリアが表示されている場合、並び順の更新を行う
    const showEditArea = $('.edit-btn').is(':disabled');
    if (showEditArea) {
        openEditArea();
    }
}

// 2Pwinボタンを押下した時の処理
const winner2P = function() {
    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 1Pを末尾に移動させる
    const target = nowOrderArray[0];
    nowOrderArray.splice(0,1);
    nowOrderArray.push(target);
    
    const nextOrder = linefeedManager(nowOrderArray);
    $('.now-order').html(nextOrder);


    // 2Pが勝った場合、連勝数は１で初期化
    winCounter = 1;
    $('.win-counter').text(winCounter);
    $('.winner').text(nowOrderArray[0]);
    
    resultManager(nowOrderArray);

    // 編集エリアが表示されている場合、並び順の更新を行う
    const showEditArea = $('.edit-btn').is(':disabled');
    if (showEditArea) {
        openEditArea();
    }

}

// 結果を押された場合の処理
const resultManager = function(playerArray) {

    $('.now-card').html(playerArray[0] + ' vs ' + playerArray[1]);
    
    
    $('.result-btn').empty();
    

    $('.result-btn').append('<p class="one-on-one-question">勝ったのはどっち？</p>');
    $('.result-btn').append('<p class="team-question displaynone">負けたほうを選んでね</p>');
    $('.result-btn').append('<button class="winner1P">' + playerArray[0] + '</button>');
    $('.result-btn').append('<button class="winner2P">' + playerArray[1] + '</button>');

    $('.winner1P').click(function(){
        winner1P();
    });

    $('.winner2P').click(function(){
        winner2P();
    });
    nextMatch();
}

// 編集エリアを開く
const openEditArea = function () {
    
    $('.edit-btn').prop('disabled', true);
    $('.close-edit-btn').prop('disabled', false);

    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 追加エリアがすでにある場合は削除して、改めて生成
    if($('.add-area').length > 0) {
        $('.add-area').empty();
    }

    // 並び替えエリアがすでにある場合は削除して、改めて生成
    if($('.sort-area').length > 0) {
        $('.sort-area').empty();
    }

    // 削除エリアがすでにある場合は削除して、改めて生成
    if($('.delete-area').length > 0) {
        $('.delete-area').empty();
    }
    // 追加エリアの準備
    $('.add-area').append('<h3>ユーザーの追加</h3>');
    $('.add-area').append('<p>追加するユーザー名を入力してください</p>');
    $('.add-area').append('<input class="add-user-name" type="text" value="">');
    $('.add-area').append('<p>どのユーザーの後に参加するか選択してください</p>');

    // ユーザー全表示
    for(var i = 0; i < nowOrderArray.length; i++) {
        $('.add-area').append('<button data-index="' + i +'" class="add-user-btn">' + nowOrderArray[i] + '</button>');
    }

    // 追加する場合の処理
    $('.add-user-btn').click(function() {
        addUser(event);
    })

    // 並び替えエリアの準備
    $('.sort-area').append('<h3>ユーザーの並び替え</h3>');
    $('.sort-area').append('<p>一つ後ろに並び替えます、ユーザーを選んでください</p>');

    // ユーザー全表示（一番後ろのユーザーのみ非表示）
    for(var i = 0; i < nowOrderArray.length; i++) {
        if (i === nowOrderArray.length - 1) {
            $('.sort-area').append('<button data-index="' + i +'" class="sort-user-btn" disabled=true>' + nowOrderArray[i] + '</button>');
        } else {
            $('.sort-area').append('<button data-index="' + i +'" class="sort-user-btn">' + nowOrderArray[i] + '</button>');
        }
        
    }

    // 削除する場合の処理
    $('.sort-user-btn').click(function() {
        sortUser(event);
    })

    // 削除エリアの準備
    $('.delete-area').append('<h3>ユーザーの削除</h3>');
    $('.delete-area').append('<p>どのユーザーを削除するか選択してください</p>');

    // ユーザー全表示
    for(var i = 0; i < nowOrderArray.length; i++) {
        $('.delete-area').append('<button data-index="' + i +'" class="delete-user-btn">' + nowOrderArray[i] + '</button>');
    }

    // 削除する場合の処理
    $('.delete-user-btn').click(function() {
        deleteUser(event);
    })

    // 追加・削除エリアの表示
    $('.add-area').removeClass("displaynone");
    $('.sort-area').removeClass("displaynone");
    $('.delete-area').removeClass("displaynone");
}


// 編集エリアを閉じる
const closeEditArea = function () {

    // 追加・削除エリアを非表示にする
    $('.add-area').addClass("displaynone");
    $('.sort-area').addClass("displaynone");
    $('.delete-area').addClass("displaynone");

    $('.close-edit-btn').prop('disabled', true);
    $('.edit-btn').prop('disabled', false);
}


// ユーザーの追加
const addUser = function (event) {

    // 何番目に入れるかを取得（選択された番号の後に追加する）
    const addIndex = Number(event.currentTarget.dataset['index']) + 1;
    
    // 追加する名前を取得
    const addName = $('.add-user-name').val();

    // 最新の並び順を取得
    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 名前の追加
    nowOrderArray.splice(addIndex, 0, addName);

    // 表示の最新化
    const nextOrder = linefeedManager(nowOrderArray);
    $('.now-order').html(nextOrder);
    openEditArea();
    resultManager(nowOrderArray);
}


// ユーザーの並び替え
const sortUser = function (event) {

    // 何番目に入れるかを取得（選択された番号の後に追加する）
    const sortTarget = Number(event.currentTarget.dataset['index']);
    if (sortTarget == 0) {
        winCounter = 0;
    } 

    // 最新の並び順を取得
    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 名前の追加
    const tmpName = nowOrderArray[sortTarget];
    nowOrderArray[sortTarget] = nowOrderArray[sortTarget + 1];
    nowOrderArray[sortTarget + 1 ] = tmpName;

    // 表示の最新化
    const nextOrder = linefeedManager(nowOrderArray);
    $('.now-order').html(nextOrder);
    openEditArea();
    resultManager(nowOrderArray);
}


// 削除処理
const deleteUser = function (event) {
    
    // 何番目のユーザーを削除するか取得
    const deleteIndex = event.currentTarget.dataset['index'];
    
    if (Number(deleteIndex) === 0) {
        winCounter = 0;
    $('.win-counter').text(winCounter);
    }

    // 最新の並び順を取得
    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);

    // 名前の削除
    nowOrderArray.splice(deleteIndex, 1);

    // 表示の最新化
    const nextOrder = linefeedManager(nowOrderArray);
    
    if (Number(deleteIndex) === 0) {
        winCounter = 0;
        $('.win-counter').text(winCounter);
        $('.winner').text(nowOrderArray[0]);
    }
    
    $('.now-order').html(nextOrder);
    openEditArea();
    resultManager(nowOrderArray);

}
    // 次の対戦者を表示
    const nextMatch = function () {
        const nowOrder = $('.now-order').text();
        const nowOrderArray = nowOrder.split(splitChar);
        if (nowOrderArray.length > 2) {
            $('.next-match').text(nowOrderArray[2]);
        } else {
            $('.next-match').text('');
        }
    }


// 主固定の場合
const fixHostPlayer = function () {

    const nowOrder = $('.now-order').text();
    const nowOrderArray = nowOrder.split(splitChar);
    for (let i = 0; i < nowOrderArray.length; i++) {
        $('[name="host-name"]').append($('<option>').html(nowOrderArray[i]).val(i));
    }
}

// 並び順一覧の改行処理
// ５人ごとに改行した並び順の文字列を返却する
const linefeedManager = function (order) {
    let includeNewLineOrder = '';

    for (let i = 0; i < order.length; i++) {
        // 1人目は改行しない
        if (i !== 0 && i % 5 == 0) {
            includeNewLineOrder += '</br>' ;
        }

        // 1人目の前には→はつかない
        if (i !== 0) {
            includeNewLineOrder += '→' ;
        }

        includeNewLineOrder += order[i];
    
    }

    return includeNewLineOrder;
}

$(function(){
    $('.finish-btn').click(function(){
        pushOrderFinishBtn();
    });


    $('.win-counter').text(winCounter);

    $('.win-counter-keeper').change(function() {
        $('.win-counter').text(winCounter);
    });
});