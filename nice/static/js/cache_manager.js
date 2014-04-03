var cacheManager = null;
var CACHE_INIT = false;

function Cache_init()
{
    if (CACHE_INIT)
        return;
    CACHE_INIT = true;
    cacheManager = _CacheMan_new();
}

function _CacheMan_new()
{
    ret = {cached: {}};
    return ret;
}

function CacheMan_load(url)
{
    if (cacheManager.cached[url] == null)
        _CacheMan_cacheURL(url);
    return cacheManager.cached[url];
}

function _CacheMan_cacheURL(url)
{
    $.ajax("popup-template", {
        async: false,
        dataType: "html",
        success: function(data){
            cacheManager.cached[url] = data;
        }
    });
}
