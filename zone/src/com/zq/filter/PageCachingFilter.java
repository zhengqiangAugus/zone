package com.zq.filter;

import java.util.Enumeration;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.ehcache.CacheException;
import net.sf.ehcache.constructs.blocking.LockTimeoutException;
import net.sf.ehcache.constructs.web.AlreadyCommittedException;
import net.sf.ehcache.constructs.web.AlreadyGzippedException;
import net.sf.ehcache.constructs.web.filter.FilterNonReentrantException;
import net.sf.ehcache.constructs.web.filter.SimplePageCachingFilter;
import org.apache.commons.lang.StringUtils;
 
/**
 * <b>function:</b> mobile ҳ�滺�������
 * @author hoojo
 * @createDate 2012-7-4 ����09:34:30
 * @file PageEhCacheFilter.java
 * @package com.hoo.ehcache.filter
 * @project Ehcache
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class PageCachingFilter extends SimplePageCachingFilter {
 
    private final static String FILTER_URL_PATTERNS = "excepts";
    private static String[] cacheURLs;
    
    private void init() throws CacheException {
        String patterns = filterConfig.getInitParameter(FILTER_URL_PATTERNS);
        cacheURLs = StringUtils.split(patterns,",");
    }
    @Override
    protected void doFilter(final HttpServletRequest request,final HttpServletResponse response, final FilterChain chain) throws AlreadyGzippedException, AlreadyCommittedException,FilterNonReentrantException, LockTimeoutException, Exception {
        if (cacheURLs == null) {
            init();
        }
        String url = request.getRequestURI();
        boolean flag = false;
        if (cacheURLs != null && cacheURLs.length > 0) {
            for (String cacheURL : cacheURLs) {
                if (url.contains(cacheURL.trim())) {
                    flag = true;
                    break;
                }
            }
        }
        // �����������Ҫ�����url �ͻ����ҳ�棬����ִ��������ҳ��ת��
        if (flag) {
            String query = request.getQueryString();
            if (query != null) {
                query = "?" + query;
            }
            System.out.println("���ܱ�����������Ѿ����ͷţ�URL:"+url);
            chain.doFilter(request, response);
        } else {
        	System.out.println("�����������URL:"+url);
        	super.doFilter(request, response, chain);
        }
    }
    
    private boolean headerContains(final HttpServletRequest request, final String header, final String value) {
        logRequestHeaders(request);
        Enumeration<?> accepted = request.getHeaders(header);
        while (accepted.hasMoreElements()) {
            String headerValue = (String) accepted.nextElement();
            if (headerValue.indexOf(value) != -1) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @see net.sf.ehcache.constructs.web.filter.Filter#acceptsGzipEncoding(javax.servlet.http.HttpServletRequest)
     * <b>function:</b> ����ie6/7 gzipѹ��
     * @author hoojo
     * @createDate 2012-7-4 ����11:07:11
     */
    @Override
    protected boolean acceptsGzipEncoding(HttpServletRequest request) {
        boolean ie6 = headerContains(request, "User-Agent", "MSIE 6.0");
        boolean ie7 = headerContains(request, "User-Agent", "MSIE 7.0");
        return acceptsEncoding(request, "gzip") || ie6 || ie7;
    }
}