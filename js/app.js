let videoTitle = [];
let videoUrl = [];
let videoImage = [];
let videoDay = [];
let videoView = [];

$(document).ready(() => {
  listing();

  setTimeout(() => {
    const l = videoTitle.length;

    for (i = 0; i < l; i++) {
      const temp_html = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                                            <figure class="effect-ming tm-video-item">
                                                <figcaption class="d-flex align-items-center justify-content-center">
                                                    <a href="${videoUrl[i]}"><img src="${videoImage[i]}" alt="Image" class="img-fluid"></a>
                                                </figcaption>
                                                <h3>${videoTitle[i]}</h3>
                                            </figure>
                                            <div class="d-flex justify-content-between tm-text-gray">
                                                <span>${videoDay[i]}</span>
                                                <span>${videoView[i]} views</span>
                                            </div>
                                        </div>`;
      $("#videos").append(temp_html);
      console.log(videoTitle.slice(10));
      console.log(videoUrl.slice(10));
      console.log(videoImage.slice(10));
      console.log(videoDay.slice(10));
      console.log(videoView.slice(10));

      const temp_image = `<img class="main-image" src="${videoImage[0]}" />`;
      $("#image-container").append(temp_image);
    }
  }, 10);
});

function listing() {
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=KR&videoCategoryId=20&key=AIzaSyCWWcxidOOzDR8SbEofjAUVdp2u51YtXj0",
    async: false,
    data: {},
    success: (response) => {
      const rows = response.items;

      rows.map((video) => {
        videoTitle.push(video.snippet.title);
        videoUrl.push("https://youtu.be/" + video.id);
        videoImage.push(video.snippet.thumbnails.high.url);
        videoDay.push(video.snippet.publishedAt.substring(0, 10));
      });
    },
  });
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&chart=mostPopular&maxResults=30&regionCode=KR&key=AIzaSyCWWcxidOOzDR8SbEofjAUVdp2u51YtXj0",
    async: false,
    data: {},
    success: (response) => {
      const rows = response.items;

      rows.map((video) => {
        videoView.push(video.statistics.viewCount);
      });
    },
  });
}
