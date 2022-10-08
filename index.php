<?php

$imagesDir = 'assets/img/hyeri_0609/';
$images = glob($imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
$randomImage = $images[array_rand($images)];

$urls = glob('*', GLOB_BRACE);
?>

<style type="text/css">
    * {
        color: white;
        padding: 0;
        margin: 0;
    }

    main {
        width: 100vw;
        height: 100vh;
        background: black url(<?php echo $randomImage ?>) no-repeat center center;
        background-size: contain;
    }

    #list {
        /* float: left; */
        top: 10px;
        left: 10px;
        display: inline;
    }

    #list a {
        text-decoration: none;
    }
</style>
<main id="wrapper" onclick="window.location.reload()">
    <ul id="list">
        <?php foreach ($urls as $url) { ?>
            <li><a href="<?php echo $url ?>"><?php echo $url ?></a></li>
        <?php } ?>
    </ul>
</main>