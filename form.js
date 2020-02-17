document.querySelectorAll('form').forEach(function (form) {
    if (!form.action || form.action === location.href) {
        form.action = 'https://form.ponomarev.studio';
        form.method = 'POST';
    }
    form.onsubmit = function (event) {
        event.target.querySelector('[type="submit"]').disabled = true;
        let url = event.target.action;
        let data = new FormData(event.target);
        const args = {mode: "no-cors", method: event.target.method};
        if (new URLSearchParams(window.location.search).has('debugForms')) data.append('debug', 'mode'); // TODO: Debug mode
        if (event.target.method === 'post') args.body = data; else {
            url += '?' + new URLSearchParams(data).toString();
        }
        fetch(url, args)
            .then(function () {
                // event.target.parentNode.classList.toggle('form-result', true);
                event.target.querySelector('[type="submit"]').disabled = false;
                // alert('Спасибо, скоро мы свяжемся с вами');
                location.hash = 'success';
            });
        return false;
    };
});