<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/style.css">
    <title>Small Vanilla JS Projects</title>
</head>
<body>
    <?php
    // Only get folder.
    $folders = glob('*', GLOB_ONLYDIR );
    $projects = [];
    $current_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";


    foreach( $folders as $slug ) {
        // Only get projects folder.
        if ( in_array( $slug, ['assets', 'node_modules', 'base' ]) ) {
            continue;
        }

        // Convert slug to title.
        $title = ucwords( str_replace( '-', ' ', $slug ) );
        $projects[] = [
            'title'     => $title,
            'url'       => $slug,
            'thumbnail' => $current_link . $slug . '/thumbnail.png',
        ];
    }
    ?>
    <section class="hero">
        <div>
            <h1>Mini vanilla JS Projects</h1>
            <p>JS Projects using nothing but HTML5, CSS & Javascript, no JS frameworks or library</p>
        </div>
    </section>

    <main>
        <p class="intro">All the designs of these projects are taken from other repositories and tutorials. I'm using Sass as the CSS compiler. I also use TypeScript instead of vanilla JS for practicing.<br><strong><a href="https://github.com/viet34tqc/small-projects-vanilla-js">Link Github</a></strong></p>
        <div class="projects">
            <?php foreach( $projects as $project ) : ?>
                <a href="<?= $project['url'] ?>" class="project">
                    <img src="<?= $project['thumbnail'] ?>" alt="<?= $project['title'] ?>" class="project__thumb">
                    <div class="project__content">
                        <h3 class="project__title">
                            <?= $project['title'] ?>
                        </h3>
                        <button class="project__button">View Demo</button>
                    </div>
                </a>
            <?php endforeach ?>
        </div>
    </main>
</body>
</html>
