const PERCENTAGE_KEY = "PERCENTAGE_KEY";
// default to 1s refresh window
const DEFAULT_PERCENTAGE = "2";

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;

function save_percentage() {
    let percentage_setting = document.getElementById("percentage-setting");
    let percentage = percentage_setting.value;
    let percentage_num = Number(percentage);

    if (percentage_num < MIN_PERCENTAGE || percentage_num > MAX_PERCENTAGE) {
        // revert to old storage
        browser.storage.local.get().then(
            (item) => {
                let percentage = get_percentage_or_default(item);
                document.getElementById("percentage-setting").value = percentage;
            },
            (_) => {
                document.getElementById("percentage-setting").value = DEFAULT_PERCENTAGE;
            }
        );
        return;
    }

    // all clear, update the storage
    browser.storage.local.set({
        PERCENTAGE_KEY: percentage
    });
}

function get_percentage_or_default(item) {
    if (!item || !(PERCENTAGE_KEY in item)) {
        browser.storage.local.set({
            PERCENTAGE_KEY: DEFAULT_PERCENTAGE
        });
        return DEFAULT_PERCENTAGE;
    } else {
        return item[PERCENTAGE_KEY];
    }
}

// hook save button
document.getElementById("save-button").addEventListener("click", save_percentage);

// setup defaults
browser.storage.local.get().then(
    (item) => {
        let percentage = get_percentage_or_default(item);
        document.getElementById("percentage-setting").value = percentage;
    },
    (_) => {
        document.getElementById("percentage-setting").value = DEFAULT_PERCENTAGE;
    }
);