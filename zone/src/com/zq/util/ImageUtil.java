package com.zq.util;

import java.awt.Dimension;
import java.awt.Image;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class ImageUtil {
	public static void cutImage(int x, int y, int width, int height,
			String oldpath, String newpath) {
		FileInputStream is = null;
		ImageInputStream iis = null;

		String imgType = oldpath.substring(oldpath.lastIndexOf(".") + 1);
		try {
			is = new FileInputStream(oldpath);
			Iterator<ImageReader> it = ImageIO
					.getImageReadersByFormatName(imgType);
			ImageReader reader = it.next();
			iis = ImageIO.createImageInputStream(is);
			reader.setInput(iis, true);
			ImageReadParam param = reader.getDefaultReadParam();
			Point p = new Point();
			p.setLocation(x, y);
			Dimension d = new Dimension();
			d.setSize(width, height);
			Rectangle rect = new Rectangle(p, d);
			param.setSourceRegion(rect);
			BufferedImage bi = reader.read(0, param);
			ImageIO.write(bi, imgType, new File(newpath));
			is.close();
			iis.close();
		} catch (Exception e) {
		}
	}

	public static void scaleImage(String oldpath, String newpath, int wdith,
			int height) {
		File oldimg = new File(oldpath);
		try {
			BufferedImage bi = ImageIO.read(oldimg);
			Image Itemp = bi.getScaledInstance(wdith, height,
					BufferedImage.SCALE_SMOOTH);
			BufferedImage thumbnail = new BufferedImage(wdith, height,
					BufferedImage.TYPE_INT_RGB);
			thumbnail.getGraphics().drawImage(Itemp, 0, 0, null);
			File newimg = new File(newpath);
			FileOutputStream out = new FileOutputStream(newimg);
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
			JPEGEncodeParam param = encoder
					.getDefaultJPEGEncodeParam(thumbnail);
			param.setQuality(1.0f, false);
			encoder.encode(thumbnail);
			out.close();
			bi.flush();
			bi = null;
		} catch (IOException e) {
		}
	}

	public static void main(String[] args) {
		cutImage(20, 20, 30, 30, "D:/2.gif", "D:/3.gif");
	}
}