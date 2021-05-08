function render_gauge(wfreq) {
    var data = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9], nticks: 10, tickmode: "auto" },
            threshold: { value: wfreq, line: { width: 20, color: "#909" } },
            steps: [
            { range: [0, 1], color: "#EEF" },
            { range: [1, 2], color: "#DDF" },
            { range: [2, 3], color: "#CCF" },
            { range: [3, 4], color: "#BBF" },
            { range: [4, 5], color: "#AAF" },
            { range: [5, 6], color: "#99F" },
            { range: [6, 7], color: "#88F" },
            { range: [7, 8], color: "#77F" },
            { range: [8, 9], color: "#66F" }
            ]
        }
        }
    ];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);

}